import { requireAuth } from '@/auth.utils';
import DashboardContainer from '@/components/DashboardContainer';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'Dashboard',
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
      <DashboardContainer>{children}</DashboardContainer>
    </SessionProvider>
  );
};

export default DashboardLayout;
