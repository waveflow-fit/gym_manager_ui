import { auth } from '@/auth.utils';
import { LoginForm } from '@/components/LoginForm';
import { redirect } from 'next/navigation';

const Home = async () => {
  const session = await auth();

  if (session) {
    redirect('/dashboard');
  }
  return <LoginForm />;
};

export default Home;
