import IUser from "@/interfaces/IUser"
import NextAuth from "next-auth"
import { GoogleProfile } from "next-auth/providers/google"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: IUser
  }
  interface Profile extends GoogleProfile {}
}