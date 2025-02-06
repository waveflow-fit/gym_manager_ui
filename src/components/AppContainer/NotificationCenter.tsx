// import NotificationsIcon from '@mui/icons-material/Notifications';

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Badge } from '@mui/material';

import { SectionContainer } from '@/components/StyledComponents';
const NotificationCenter = () => {
  return (
    <Badge badgeContent={2000} color='primary' max={10} overlap='circular'>
      <SectionContainer sx={{ p: 2 }}>
        <NotificationsNoneIcon />
      </SectionContainer>
    </Badge>
  );
};

export default NotificationCenter;
