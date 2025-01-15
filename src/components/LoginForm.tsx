import { signIn } from '@/auth';
import GoogleIcon from '@mui/icons-material/Google';
import { Button, Typography } from '@mui/material';
import Image from 'next/image';

export const LoginForm = () => {
  const handleGoogleLogin = async () => {
    'use server';
    await signIn('google', { redirectTo: '/home' });
  };

  return (
    <div className='h-full w-full justify-center items-center flex-col flex gap-4 bg_gradient'>
      <Typography variant='h2' className='font-extrabold'>
        Gym Manager
      </Typography>
      <Image src='/logo.png' height={256} width={256} alt='Logo' />
      <Button
        startIcon={<GoogleIcon />}
        variant='contained'
        onClick={handleGoogleLogin}
      >
        Login with google
      </Button>
    </div>
  );
};
