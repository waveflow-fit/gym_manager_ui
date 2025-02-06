import { Box, Grid2 as Grid, Typography } from '@mui/material';

import AddQuickAccessibilityItem from '@/components/Dashboard/AddQuickAccessibilityItem';
import UserTitle from '@/components/Dashboard/UserTitle';

const quickAccessibilityItems = [];

const Dashboard = () => {
  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <UserTitle />
      {quickAccessibilityItems.length === 0 && (
        <Typography variant='body1'>
          You can configure your dashboard as per your preference
        </Typography>
      )}
      <Grid container height='100%' spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <AddQuickAccessibilityItem />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
