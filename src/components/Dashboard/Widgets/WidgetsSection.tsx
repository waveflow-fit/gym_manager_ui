import { Box } from '@mui/material';

import { EUserRole } from '@/common/constants';
import AddNewTraineeWidget from '@/components/Dashboard/Widgets/AddNewTraineeWidget';
import RoleFlag from '@/components/RoleFlag';

const WidgetsSection = () => {
  return (
    <Box width='100%' height='100%'>
      <RoleFlag allowedFor={EUserRole.TRAINER}>
        <AddNewTraineeWidget />
      </RoleFlag>
    </Box>
  );
};
export default WidgetsSection;
