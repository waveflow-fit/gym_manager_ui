import { auth } from '@/auth.utils';
import { LoginForm } from '@/components/LoginForm';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect('/dashboard');
  }
  return <LoginForm />;
}
