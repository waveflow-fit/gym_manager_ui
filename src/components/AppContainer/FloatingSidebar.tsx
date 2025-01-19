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
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useCallback, useMemo, useState } from 'react';

import { urls } from '@/appUrls';

const FloatingSidebar = () => {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(true);
  const toggleFloatingBarMinimization = useCallback(
    () => setIsSidebarMinimized(!isSidebarMinimized),
    [isSidebarMinimized]
  );
  const theme = useTheme();
  const pathname = usePathname();
  console.log(pathname);

  const sidebarOptions = useMemo(
    () => [
      {
        text: 'Home',
        icon: <HomeIcon color='inherit' />,
        navigateTo: urls.dashboard,
      },
      {
        text: 'Trainees',
        icon: <SportsGymnasticsIcon color='inherit' />,
        navigateTo: urls.trainees,
      },
      {
        text: 'Workout plan',
        icon: <FitnessCenterIcon color='inherit' />,
        navigateTo: urls.workout,
      },
      {
        text: 'Diet plan',
        icon: <FlatwareIcon color='inherit' />,
        navigateTo: urls.diet,
      },
      {
        text: 'Todo List',
        icon: <FormatListBulletedIcon color='inherit' />,
        navigateTo: urls.todo,
      },
      {
        text: 'Sign out',
        icon: <LogoutIcon color='inherit' />,
        handleClick: () => signOut({ redirectTo: urls.root }),
      },
    ],
    []
  );
  return (
    <Box width='fit-content' padding='1rem' borderRadius='0.75rem'>
      <Box width='100%' height='100%' position='relative'>
        <List
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            borderRadius: '1.5rem',
          }}
          component='nav'
        >
          {sidebarOptions.map(({ text, icon, handleClick, navigateTo }) => {
            const sidebarItem = (
              <ListItemButton
                key={text}
                selected={navigateTo === pathname}
                {...(handleClick ? { onClick: handleClick } : {})}
              >
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
            return navigateTo ? (
              <Link href={navigateTo} key={text}>
                {sidebarItem}
              </Link>
            ) : (
              sidebarItem
            );
          })}
        </List>
        <Box
          onClick={toggleFloatingBarMinimization}
          color={theme.palette.text.secondary}
          position='absolute'
          left='100%'
          sx={{
            transform: 'translateX(-50%)',
            top: '10%',
            cursor: 'pointer',
          }}
        >
          {isSidebarMinimized ? (
            <AddCircleIcon color='inherit' />
          ) : (
            <RemoveCircleIcon color='inherit' />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default FloatingSidebar;
