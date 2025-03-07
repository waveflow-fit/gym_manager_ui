import Box from '@mui/material/Box';
import { Suspense } from 'react';

import { MANAGEMENT_TRAINER_ENDPOINTS } from '@/common/apiEndpoints';
import ImageRenderer from '@/components/DataGrid/CellRenderers/ImageRenderer';
import PaginatedDataGrid from '@/components/DataGrid/PaginatedDataGrid';
import { ColDef } from '@/types/common';

const columns: ColDef[] = [
  {
    field: 'trainee.image',
    headerName: 'Image',
    width: 120,
    renderCell: ImageRenderer,
    disableColumnMenu: true,
    cellRenderParams: { fallbackField: 'trainee.name' },
  },
  {
    field: 'trainee.name',
    headerName: 'Name',
    flex: 1,
    disableColumnMenu: true,
  },
  {
    field: 'trainee.email',
    headerName: 'Email',
    flex: 1,
    disableColumnMenu: true,
  },
];

type TTraineeData = {
  id: string;
  trainee: { name: string; image: string; email: string };
};

const Trainees = () => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='100%'
      width='100%'
    >
      <Suspense fallback='Loading...'>
        <PaginatedDataGrid<TTraineeData>
          columns={columns}
          searchKey='trainee.name'
          dataEndpoint={MANAGEMENT_TRAINER_ENDPOINTS.GET_ALL_ASSOCIATION}
        />
      </Suspense>
    </Box>
  );
};

export default Trainees;
