'use client';
import { createContext, useEffect, useState } from 'react';

import { EUserRole } from '@/common/constants';
import { getSession } from '@/components/SessionProvider/auth.utils';

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
  fetchSession: () => void;
}>({
  session: null,
  isLoading: false,
  fetchSession: () => {
    throw new Error('Implement function: fetchSessionFromServer');
  },
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
  const fetchSession = async () => {
    setIsSessionLoading(true);
    const userSessionDetails = await getSession();
    setSession(userSessionDetails);
    setIsSessionLoading(false);
  };

  useEffect(() => {
    (async () => {
      if (session) return;
      fetchSession();
    })();
  }, [session]);

  return (
    <SessionContext
      value={{ session, isLoading: isSessionLoading, fetchSession }}
    >
      {children}
    </SessionContext>
  );
};

export default SessionProvider;
