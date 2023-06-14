import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
interface User {
    access?:string
    refreshToken?:string
    user:{
      pk:String
    }
  }

  interface Session{
    user: {
      accessToken?: string | unknown
      id: string |unknown
    } & DefaultSession["user"]
  }
}
