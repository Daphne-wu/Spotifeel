import { NextAuthOptions, Account } from 'next-auth';
import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

// Define custom Account type for Spotify
interface SpotifyAccount extends Account {
  access_token: string;
  refresh_token: string;
  expires_in: number; // Specify expires_in as a number
}

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        url: 'https://accounts.spotify.com/authorize',
        params: {
          scope: 'user-read-private user-read-email user-top-read user-library-read',
        },
      },
      token: 'https://accounts.spotify.com/api/token',
      userinfo: 'https://api.spotify.com/v1/me',
    }),
  ],
  session: {
    strategy: 'jwt', // Store session as JWT token instead of database
  },
  callbacks: {
    async jwt({ token, account }) {
      // Type assertion for account as SpotifyAccount
      if (account) {
        const spotifyAccount = account as SpotifyAccount;
        token.accessToken = spotifyAccount.access_token;
        token.refreshToken = spotifyAccount.refresh_token;
        token.expiresAt = Date.now() + spotifyAccount.expires_in * 1000;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },
};

export default NextAuth(authOptions);
