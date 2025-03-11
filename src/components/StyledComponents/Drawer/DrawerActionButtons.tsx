import { Box } from '@mui/material';

import HStack from '@/components/StyledComponents/HStack';

const DrawerActionButtons = ({ children }: { children: React.ReactNode[] }) => {
  return (
    <HStack
      display='flex'
      gap={0.5}
      height='5%'
      alignItems='center'
      // right='1rem'
      // position='absolute'
      // bottom='1rem'
    >
      <Box display='flex' gap={0.5}>
        {children}
      </Box>
    </HStack>
  );
};

export default DrawerActionButtons;
