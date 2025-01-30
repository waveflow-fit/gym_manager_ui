import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { redirect } from 'next/navigation';

import { api } from '@/common/api.utils';
import { USER_ENDPOINTS } from '@/common/apiEndpoints';
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
      const { access_token, refresh_token, id_token } = account;
      console.log('here');
      api.post(USER_ENDPOINTS.GOOGLE_SIGN_IN, { id_token });
      if (account.provider === 'google') {
        return profile.email_verified;
      }
      return true;
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
