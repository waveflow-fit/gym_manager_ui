import type { Metadata } from 'next';

import { ROUTE_URLS } from '@/common/appUrls';
import AppContainer from '@/components/AppContainer';
import { getSession } from '@/components/SessionProvider/auth.utils';
import SessionProvider from '@/components/SessionProvider/SessionProvider';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Gym manager',
  description: 'Gym manager application, Dashboard for activity management',
};

const DashboardLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  const session = await getSession(token?.value);
  if (!session) {
    redirect(ROUTE_URLS.root);
  }
  return (
    <SessionProvider serverSession={session}>
      <AppContainer>{children}</AppContainer>
    </SessionProvider>
  );
};

export default DashboardLayout;
