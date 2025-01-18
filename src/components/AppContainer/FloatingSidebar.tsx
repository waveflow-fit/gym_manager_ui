'use client';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FlatwareIcon from '@mui/icons-material/Flatware';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import { signOut } from 'next-auth/react';
import { useMemo, useState } from 'react';

const FloatingSidebar = () => {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(true);
  const toggleFloatingBarMinimization = () =>
    setIsSidebarMinimized(!isSidebarMinimized);
  const theme = useTheme();
  const sidebarOptions = useMemo(
    () => [
      {
        text: 'Home',
        icon: <HomeIcon color='inherit' />,
        handleClick: toggleFloatingBarMinimization,
      },
      { text: 'Trainees', icon: <SportsGymnasticsIcon color='inherit' /> },
      { text: 'Workout plan', icon: <FitnessCenterIcon color='inherit' /> },
      { text: 'Diet plan', icon: <FlatwareIcon color='inherit' /> },
      { text: 'Todo List', icon: <FormatListBulletedIcon color='inherit' /> },
      {
        text: 'Sign out',
        icon: <LogoutIcon color='inherit' />,
        handleClick: () => signOut({ redirectTo: '/' }),
      },
    ],
    []
  );
  return (
    <Box width='fit-content' padding={'1rem'} borderRadius={'0.75rem'}>
      <Box width={'100%'} height={'100%'} position={'relative'}>
        <List
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            borderRadius: '1.5rem',
          }}
          component='nav'
        >
          {sidebarOptions.map(({ text, icon, handleClick }) => {
            return (
              <ListItemButton key={text} onClick={handleClick}>
                <ListItemIcon
                  sx={{
                    color: theme.palette.text.secondary,
                    ...(isSidebarMinimized
                      ? { display: 'flex', justifyContent: 'center' }
                      : {}),
                  }}
                >
                  {icon}
                </ListItemIcon>
                {!isSidebarMinimized && (
                  <ListItemText sx={{ whiteSpace: 'nowrap' }} primary={text} />
                )}
              </ListItemButton>
            );
          })}
        </List>
        <Box
          onClick={toggleFloatingBarMinimization}
          color={theme.palette.text.secondary}
          position={'absolute'}
          left={'100%'}
          sx={{
            transform: 'translateX(-50%)',
            top: '10%',
            cursor: 'pointer',
          }}
        >
          {isSidebarMinimized ? (
            <AddCircleIcon color='inherit' />
          ) : (
            <RemoveCircleIcon color={'inherit'} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default FloatingSidebar;
