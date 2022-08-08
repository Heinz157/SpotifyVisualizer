import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { callbackify } from "util";
import { LOGIN_URL } from "../../../lib/spotify";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/Login',
  },
  callbacks: {
  async jwt({token, account, user}) {

    // initial sign in
    if (account && user) {
        return {
            ...token,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            username: account.providerAccountId,
            accessTokenExpires: account.expires_at * 1000, // convert to ms
        }
    }

    // refresh token
    if (Date.now() < token.accessTokenExpires) {
        console.log('Exisiting token is valid')
        return token;
    }
    // New Access Token
    console.log('Exisiting token is expired')
    return await refreshAccessToken(token);
    }
  } 
})