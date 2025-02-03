import { SessionContext } from '@/components/SessionProvider/SessionProvider';
import { useContext } from 'react';

const useSession = () => {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error('SessionProvider wrapper missing');
  }
  return ctx;
};

export default useSession;
