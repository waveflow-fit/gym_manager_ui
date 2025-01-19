import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';

import { requireAuth } from '@/auth.utils';
import AppContainer from '@/components/AppContainer';

export const metadata: Metadata = {
  title: 'Gym manager',
  description: 'Gym manager application, Dashboard for activity management',
};

const DashboardLayout = async ({
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

export default DashboardLayout;
