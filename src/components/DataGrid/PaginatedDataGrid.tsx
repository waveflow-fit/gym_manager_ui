'use client';

import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useCallback, useEffect, useState } from 'react';

import { api } from '@/common/api.utils';
import { PAGINATION } from '@/common/constants';
import DynamicRenderer from '@/components/DynamicRenderer/DynamicRenderer';
import { SectionContainer } from '@/components/StyledComponents';

type Props<T extends { id: string }> = {
  rows: T[];
  columns: GridColDef[];
  dataEndpoint: string;
  getRowId?: (item: T) => string | number;
  checkboxSelection?: boolean;
};
const initData = {
  data: [],
  isLoading: true,
  isError: false,
};
const PaginatedDataGrid = <T extends { id: string }>({
  rows,
  columns,
  dataEndpoint,
  getRowId,
  checkboxSelection = false,
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

  return (
    <SectionContainer sx={{ overflowX: 'auto' }}>
      <DynamicRenderer
        isLoading={state.isLoading}
        isError={state.isError}
        isNoResultFound={state.data.length === 0}
      >
        <Box sx={{ width: '100%', height: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={getRowId}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 50 },
              },
            }}
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
