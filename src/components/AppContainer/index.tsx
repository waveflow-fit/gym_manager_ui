'use client';

import { CircularProgress, useTheme } from '@mui/material';
import Box from '@mui/material/Box';

import FloatingSidebar from '@/components/AppContainer/FloatingSidebar';
import FloatingTopBar from '@/components/AppContainer/FloatingTopBar';
import useSession from '@/components/SessionProvider/useSession';

type TAppContainer = { children: React.ReactNode };

const AppContainer = ({ children }: TAppContainer) => {
  const theme = useTheme();
  const sidebarWidth = theme.custom.leftPanelWidthExpanded;
  const { isLoading } = useSession();
  if (isLoading) {
    return (
      <Box
        height='100%'
        width='100%'
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box
      height='100%'
      display='flex'
      width='100%'
      bgcolor={theme.palette.background.main}
    >
      <Box maxWidth={sidebarWidth} display='flex' alignItems='center'>
        <FloatingSidebar />
      </Box>
      <Box display='flex' flexDirection='column' height='100%' width='100%'>
        <Box height={theme.custom.headerHeight}>
          <FloatingTopBar />
        </Box>
        <Box height={`calc(100% - ${theme.custom.headerHeight})`} py={4} px={6}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AppContainer;
