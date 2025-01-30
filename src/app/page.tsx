import { redirect } from 'next/navigation';

import { ROUTE_URLS } from '@/common/appUrls';
import { auth } from '@/common/auth.utils';
import { LoginForm } from '@/components/LoginForm';

const Dashboard = async () => {
  const session = await auth();

  if (session) {
    redirect(ROUTE_URLS.dashboard);
  }
  return <LoginForm />;
};

export default Dashboard;
