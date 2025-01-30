import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { redirect } from 'next/navigation';

import { api } from '@/common/api.utils';
import { ROUTE_URLS } from '@/common/appUrls';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }: any) {
      const { id_token } = account;
      try {
        const res = await api.post('/user/google-sign-in', { id_token });
        if (
          account.provider === 'google' &&
          profile.email_verified &&
          res.user
        ) {
          const token = res.user.token;
          return true;
        }
        return false;
      } catch {
        return false;
      }
    },
  },
});

export { signIn as clientSideSignIn } from 'next-auth/react';

export const requireAuth = async () => {
  const session = await auth();

  if (!session) {
    redirect(ROUTE_URLS.root);
  }
};
