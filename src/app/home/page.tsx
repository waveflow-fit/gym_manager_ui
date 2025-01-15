import { auth } from '@/auth';
async function Home() {
  const session = await auth();
  return (
    <div>
      <img src={session?.user?.image} alt='user image' />
      Home page
    </div>
  );
}

export default Home;
