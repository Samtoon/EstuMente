import { connect } from "@/database/connection"
import User from "@/database/models/User";
import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"

const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            credentials: {
                email: {label: "Correo", type: "text"}
            },
            async authorize(credentials, req) {
                await connect();
                const userFound = await User.findOne({email: credentials?.email})
                return userFound ? userFound : null;
            }
        })
    ],
    callbacks: {
        jwt({ token, user}) {
            //console.log("llamando jwt");
            //console.log("El usuario es:" + JSON.stringify(token.user))
            if (user) token.user = user;
            return token;
        },
        session({ session, token, user}) {
            //console.log("llamando session");
            session.user = token.user as any;
            return session;
        }
    }
}

export default authOptions;