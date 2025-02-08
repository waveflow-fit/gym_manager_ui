import { Box, Grid2 as Grid } from '@mui/material';

function WidgetsSection() {
  // const addedWidgetItems = [];
  return (
    <Box width='100%'>
      {/* {addedWidgetItems.length === 0 && (
        <Typography variant='body1' mb={2}>
          You can configure your dashboard as per your preference
        </Typography>
      )} */}
      <Grid container height='100%' spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          {/* <AddNewWidget availableWidgetsOptions={availableWidgetsOptions} /> */}
        </Grid>
      </Grid>
    </Box>
  );
}
export default WidgetsSection;
