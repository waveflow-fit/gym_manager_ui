'use client';

import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { get } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { api } from '@/common/api.utils';
import { PAGINATION } from '@/common/constants';
import DynamicRenderer from '@/components/DynamicRenderer/DynamicRenderer';
import SearchByText from '@/components/Search/SearchByText';
import { SectionContainer } from '@/components/StyledComponents';

export enum EColType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
}
const initData = {
  data: [],
  isLoading: true,
  isError: false,
};
type Props<T extends { id: string }> = {
  columns: GridColDef[];
  dataEndpoint: string;
  getRowId?: (item: T) => string | number;
  checkboxSelection?: boolean;
  searchKey?: string;
};
const PaginatedDataGrid = <T extends { id: string }>({
  columns,
  dataEndpoint,
  getRowId,
  checkboxSelection = false,
  searchKey = '',
}: Props<T>) => {
  const [state, setState] = useState<{
    data: T[];
    isLoading: boolean;
    isError: boolean;
  }>(initData);

  const fetchData = useCallback(async () => {
    try {
      setState(initData);
      const response = await api.post<{ limit: number }, { data: T[] }>(
        dataEndpoint,
        {
          limit: PAGINATION.LARGE_LIMIT,
        }
      );
      setState({ data: response.data, isLoading: false, isError: false });
    } catch {
      setState({ data: [], isLoading: false, isError: true });
    }
  }, [dataEndpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const memoizedColumns = useMemo(() => {
    return columns.map((col) => {
      const updatedCol: GridColDef = {
        ...col,
        valueGetter: (_value, row) => {
          return get(row, col.field);
        },
      };
      return updatedCol;
    });
  }, [columns]);
  return (
    <SectionContainer sx={{ overflowX: 'auto', py: '1rem' }}>
      <DynamicRenderer isLoading={state.isLoading} isError={state.isError}>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          {searchKey && <SearchByText placeholder='Search...' />}
          <DataGrid
            rows={state.data}
            columns={memoizedColumns}
            getRowId={getRowId}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 50 },
              },
            }}
            onSortModelChange={(model) => console.log(model)}
            onPaginationModelChange={(model) => console.log(model)}
            pageSizeOptions={[5, 20, 50, 100]}
            checkboxSelection={checkboxSelection}
            disableRowSelectionOnClick
            sx={{
              border: 'none',
              minWidth: '100%',
              overflowX: 'auto',
              '& .MuiDataGrid-viewport': {
                minWidth: '100%',
              },
            }}
          />
        </Box>
      </DynamicRenderer>
    </SectionContainer>
  );
};

export default PaginatedDataGrid;
