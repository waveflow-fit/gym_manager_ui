import { Box, Grid2 as Grid } from '@mui/material';

import AddNewTrainee from '@/components/Dashboard/Widgets/AddNewTrainee';
import ListInvites from '@/components/Dashboard/Widgets/ListInvites';

function WidgetsSection() {
  // const addedWidgetItems = [];
  return (
    <Box width='100%' height='100%'>
      {/* {addedWidgetItems.length === 0 && (
        <Typography variant='body1' mb={2}>
          You can configure your dashboard as per your preference
        </Typography>
      )} */}
      {/* <AddNewWidget availableWidgetsOptions={availableWidgetsOptions} /> */}
      <Grid container height='50%' spacing={3}>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }} height='fit-content'>
          <AddNewTrainee />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }} height='fit-content'>
          <ListInvites />
        </Grid>
      </Grid>
    </Box>
  );
}
export default WidgetsSection;
