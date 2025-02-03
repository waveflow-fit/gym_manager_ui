'use client';
import { EUserRole } from '@/common/constants';
import { getSession } from '@/components/SessionProvider/auth.utils';
import { createContext, useEffect, useState } from 'react';

export type TUserSession = {
  id: string;
  name: string;
  email: string;
  image: string;
  role: EUserRole;
} | null;

export const SessionContext = createContext<{
  session: TUserSession;
  isLoading: boolean;
}>({
  session: null,
  isLoading: false,
});

const SessionProvider = ({
  children,
  serverSession,
}: {
  children: React.ReactNode;
  serverSession?: TUserSession;
}) => {
  const [session, setSession] = useState<TUserSession>(serverSession || null);
  const [isSessionLoading, setIsSessionLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (session) return;
      const userSessionDetails = await getSession();
      setSession(userSessionDetails);
      setIsSessionLoading(false);
    })();
  }, []);

  return (
    <SessionContext value={{ session, isLoading: isSessionLoading }}>
      {children}
    </SessionContext>
  );
};

export default SessionProvider;
