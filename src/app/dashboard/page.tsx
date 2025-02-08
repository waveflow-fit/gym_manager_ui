import { Box } from '@mui/material';

import UserTitle from '@/components/Dashboard/UserTitle';
import WidgetsSection from '@/components/Dashboard/Widgets/WidgetsSection';

const Dashboard = () => {
  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <UserTitle />

      <WidgetsSection />
    </Box>
  );
};

export default Dashboard;
