import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

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
