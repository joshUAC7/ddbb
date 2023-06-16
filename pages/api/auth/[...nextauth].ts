import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

type TokenResponse = {
  access?: string;
  refresh?: string;
};
export const authOptions: AuthOptions = {
  session:{
  strategy:'jwt'
  },
  providers:[

     CredentialsProvider({
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: 'Credentials',
    // The credentials is used to generate a suitable form on the sign in page.
    // You can specify whatever fields you are expecting to be submitted.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      // You need to provide your own logic here that takes the credentials
      // submitted and returns either a object representing a user or value
      // that is false/null if the credentials are invalid.
      // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
      // You can also use the `req` object to obtain additional parameters
      // (i.e., the request IP address)
      const res = await fetch(process.env.DJANGOURL+"/api/auth/login/", {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" }
      })
      const user = await res.json()

      // If no error and we have user data, return it
      if (res.ok && user) {
          console.log("USERR")
          console.log(user)
        return user
      }
      // Return null if user data could not be retrieved
      return null
    }
  })],
 // pages: {
 //    signIn: "/auth/signin",
 //  },
  callbacks: {
    // async signIn({ user, account, email,profile }) {
    //   if (account?.provider == "google") { 
    //     const { access_token, id_token } = account;
    //     console.log(account)
    //     console.log(email)
    //     console.log(user)
    //     try {
    //       const response = await axios.post<TokenResponse>(
    //         process.env.DJANGOURL + "/api/social/google/",
    //         {
    //           access_token: id_token,
    //           // id_token:id_token
    //         }
    //       );
    //       
    //       const tokken = response.data;
    //       user.accessToken = tokken.access;
    //       // console.log(user);
    //       console.log("GAAA");
    //       return true;
    //     } catch (error) {
    //       console.log("NOOO")
    //       // console.log(error)

    //       return false;
    //     }
    //   }
    //   return false;
    // },
    async jwt({ token, user }) {
      console.log(user)
      if (user) {
        const { access } = user;
         token.id = user.user.pk
        token.accessToken = access;
      }
      return token;
    },
    async session({ session, user, token }) {
      // console.log(session);
      // console.log(token);
      session.user.accessToken = token.accessToken;
      session.user.id = token.id
      return session;
    },
    async redirect({ url, baseUrl }) {
    // Allows relative callback URLs
    // if (url.startsWith("/")) return `${baseUrl}${url}`
    // // Allows callback URLs on the same origin
    // else if (new URL(url).origin === baseUrl) return url
    return baseUrl
  }
  },
};

export default NextAuth(authOptions);
