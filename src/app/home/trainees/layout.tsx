import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';

import AppContainer from '@/components/AppContainer';

export const metadata: Metadata = {
  title: 'Trainees',
  description: 'Trainees manager',
};

const TraineesLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SessionProvider>
      <AppContainer>{children}</AppContainer>
    </SessionProvider>
  );
};

export default TraineesLayout;
