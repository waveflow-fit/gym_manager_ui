import { Box } from '@mui/material';

import { EUserRole } from '@/common/constants';
import AcceptInviteWidget from '@/components/Dashboard/Widgets/AcceptInvite';
import AddNewTraineeWidget from '@/components/Dashboard/Widgets/AddNewTraineeWidget';
import RoleFlag from '@/components/RoleFlag';

const WidgetsSection = () => {
  return (
    <Box width='100%' height='100%'>
      <RoleFlag allowedFor={EUserRole.TRAINER}>
        <AddNewTraineeWidget />
      </RoleFlag>
      <RoleFlag allowedFor={EUserRole.TRAINEE}>
        <AcceptInviteWidget />
      </RoleFlag>
    </Box>
  );
};
export default WidgetsSection;
