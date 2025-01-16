'use client';
import { Grid2 as Grid, Typography, useTheme } from '@mui/material';
import Image from 'next/image';

export const LoginForm = () => {
  const theme = useTheme();
  const handleGoogleLogin = async () => {
    // 'use server';
    // await signIn('google', { redirectTo: '/home' });
  };

  return (
    <Grid container height='100%'>
      <Grid
        size={{ xs: 8 }}
        display='flex'
        alignItems='center'
        height='full'
        sx={{ bgcolor: theme.palette.background.paper }}
      >
        <Typography variant='h1' color={theme.palette.text.primary}>
          Login
        </Typography>
      </Grid>
      <Grid
        size={{ xs: 4 }}
        display='flex'
        justifyContent='center'
        height='full'
      >
        <Image
          height='60'
          width='220'
          alt='login'
          src='/googl_login_icon.svg'
          onClick={handleGoogleLogin}
        />
      </Grid>
    </Grid>
  );
};
