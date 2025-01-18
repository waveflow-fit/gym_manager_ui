'use client';

import FloatingSidebar from '@/components/DashboardContainer/FloatingSidebar';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';

type TAppContainer = { children: React.ReactNode };

const DashboardContainer = ({ children }: TAppContainer) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const theme = useTheme();

  return (
    <Box
      height='100%'
      display='flex'
      width='100%'
      bgcolor={theme.palette.background.main}
    >
      <Box
        width={theme.custom.leftPanelWidth}
        border={'1px solid black'}
        position='relative'
      >
        <FloatingSidebar />
      </Box>
      <Box
        width={`calc(100% - ${theme.custom.leftPanelWidth})`}
        border={'1px solid black'}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardContainer;
