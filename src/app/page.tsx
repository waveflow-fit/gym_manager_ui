import { redirect } from 'next/navigation';

import { urls } from '@/appUrls';
import { auth } from '@/auth.utils';
import { LoginForm } from '@/components/LoginForm';

const Home = async () => {
  const session = await auth();

  if (session) {
    redirect(urls.home);
  }
  return <LoginForm />;
};

export default Home;
