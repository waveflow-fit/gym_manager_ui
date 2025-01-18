'use client';

import FloatingSidebar from '@/components/DashboardContainer/FloatingSidebar';
import FloatingTopBar from '@/components/DashboardContainer/FloatingTopBar';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
type TAppContainer = { children: React.ReactNode };

const DashboardContainer = ({ children }: TAppContainer) => {
  const theme = useTheme();
  const sidebarWidth = theme.custom.leftPanelWidthExpanded;
  return (
    <Box
      height='100%'
      display='flex'
      width='100%'
      bgcolor={theme.palette.background.main}
    >
      <Box maxWidth={sidebarWidth} display={'flex'} alignItems={'center'}>
        <FloatingSidebar />
      </Box>
      <Box
        display={'flex'}
        flexDirection={'column'}
        height={'100%'}
        width={'100%'}
      >
        <Box height={theme.custom.headerHeight}>
          <FloatingTopBar />
        </Box>
        <Box height={`calc(100% - ${theme.custom.headerHeight})`}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardContainer;
