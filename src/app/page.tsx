import { redirect } from 'next/navigation';

import { urls } from '@/appUrls';
import { auth } from '@/auth.utils';
import { LoginForm } from '@/components/LoginForm';

const Dashboard = async () => {
  const session = await auth();

  if (session) {
    redirect(urls.dashboard);
  }
  return <LoginForm />;
};

export default Dashboard;
