import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { redirect } from 'next/navigation';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
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
    redirect('/');
  }
};
