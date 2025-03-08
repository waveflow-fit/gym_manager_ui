import Box from '@mui/material/Box';
import { Suspense } from 'react';

import { MANAGEMENT_TRAINER_ENDPOINTS } from '@/common/apiEndpoints';
import ImageRenderer from '@/components/DataGrid/CellRenderers/ImageRenderer';
import MessagingActionRenderer from '@/components/DataGrid/CellRenderers/MessagingActionRenderer';
import PaymentReminderRenderer from '@/components/DataGrid/CellRenderers/PaymentReminderRenderer';
import PaginatedDataGrid from '@/components/DataGrid/PaginatedDataGrid';
import { ColDef } from '@/types/common';

const columns: ColDef[] = [
  {
    field: 'trainee.image',
    headerName: 'Image',
    maxWidth: 120,
    renderCell: ImageRenderer,
    cellRenderParams: { fallbackField: 'trainee.name' },
    sortable: false,
  },
  {
    field: 'trainee.name',
    headerName: 'Name',
  },
  {
    field: 'trainee.email',
    headerName: 'Email',
  },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    renderCell: MessagingActionRenderer,
    maxWidth: 120,
  },
  {
    field: 'paymentReminder',
    headerName: 'Payment reminder',
    sortable: false,
    renderCell: PaymentReminderRenderer,
    maxWidth: 120,
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
