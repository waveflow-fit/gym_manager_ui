import { Typography } from '@mui/material';

import HStack from '@/components/StyledComponents/HStack';

const DrawerHeader = ({ children }: { children: string }) => {
  return (
    <HStack height='5%' alignItems='center'>
      <Typography variant='h6'>{children}</Typography>
    </HStack>
  );
};
export default DrawerHeader;
