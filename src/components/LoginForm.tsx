'use client';

import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FlatwareIcon from '@mui/icons-material/Flatware';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {
  Box,
  Divider,
  Grid2 as Grid,
  Typography,
  useTheme,
} from '@mui/material';
import Image from 'next/image';

import { urls } from '@/appUrls';
import { clientSideSignIn } from '@/auth.utils';
const whatYouCanDoText = [
  {
    icon: <FitnessCenterIcon color='inherit' />,
    text: 'Design tailored fitness plans and assign them to trainees effortlessly',
  },
  {
    icon: <FlatwareIcon color='inherit' />,
    text: 'Customize nutrition plans to complement workout regimens',
  },
  {
    icon: <ManageAccountsIcon color='inherit' />,
    text: 'Stay organized with tools designed to simplify daily tasks',
  },
  {
    icon: <AutoGraphIcon color='inherit' />,
    text: 'Monitor performance and analytics to keep goals on track',
  },
];
export const LoginForm = () => {
  const theme = useTheme();
  const handleGoogleLogin = async () => {
    clientSideSignIn('google', { redirectTo: urls.dashboard });
  };

  return (
    <Grid container height='100%'>
      <Grid
        size={{ xs: 0, sm: 8 }}
        display={{ xs: 'none', sm: 'flex' }}
        justifyContent='center'
        height='100%'
        sx={{ bgcolor: theme.palette.background.default }}
        flexDirection='column'
        gap='3.75rem'
        padding={{ sm: '2.5rem', md: '3.75rem', lg: '5rem', xl: '7.5rem' }}
      >
        <Typography variant='h1'>Your Personal Gym Manager</Typography>
        <Box display='flex' flexDirection='column' gap='2rem'>
          {whatYouCanDoText.map(({ text, icon }) => {
            return (
              <Box display='flex' key={text} gap='0.5rem'>
                {icon}
                <Typography variant='body1'>{text}</Typography>
              </Box>
            );
          })}
        </Box>
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }} height='100%'>
        <Box padding={{ xs: '2.5rem', sm: '2rem', md: '2.5rem' }} height='100%'>
          <Box position="relative" height="100%">
            <Box
              display='flex'
              alignItems='center'
              flexDirection="column"
              gap="3rem"
              mb="3rem"
            >
              <Image src='/logo.png' width={180} height={180} alt='login' />
              <Typography variant='h1' textAlign="center">
                Welcome
              </Typography>
            </Box>

            <Divider>LogIn With Google</Divider>
            <Box display="flex" justifyContent="center" mt="3rem">
              <Image
                height='60'
                width='220'
                alt='login'
                src='/googl_login_icon.svg'
                onClick={handleGoogleLogin}
                className='cursor-pointer'
              />
            </Box>
            <Typography variant='body2' position="absolute" bottom={0}>
              Having queries? Lets connect, you can reach us via our email:{' '}
              <Typography
                component='a'
                variant='body2'
                href='mailto:aniket.chanana@gmail.com'
                sx={{
                  color: theme.palette.text.secondary,
                  textDecoration: 'none',
                  '&:hover': {
                    color: theme.palette.secondary.main,
                    textDecoration: 'underline',
                  },
                }}
              >
                aniket.chanana@gmail.com
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
