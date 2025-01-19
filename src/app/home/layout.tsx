import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';

import { requireAuth } from '@/auth.utils';
import AppContainer from '@/components/AppContainer';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Gym manager application, Dashboard for activity management',
};

const HomeLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  await requireAuth();
  return (
    <SessionProvider>
      <AppContainer>{children}</AppContainer>
    </SessionProvider>
  );
};

export default HomeLayout;
