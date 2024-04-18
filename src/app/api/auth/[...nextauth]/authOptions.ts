import { connect } from "@/database/connection"
import Psychologist from "@/database/models/Psychologist";
import User from "@/database/models/User";
import { IPsychologist } from "@/interfaces/IPsychologist";
import IUser from "@/interfaces/IUser";
import NextAuth, { NextAuthOptions, Profile } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google, { GoogleProfile } from "next-auth/providers/google";
import slugify from "slugify";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!

const authOptions: NextAuthOptions = {
    providers: [
        // Credentials({
        //     credentials: {
        //         email: {label: "Correo", type: "text"}
        //     }
        //     ,
        //     async authorize(credentials, req) {
        //         await connect();
        //         const userFound = await User.findOne({email: credentials?.email})
        //         return userFound ? userFound : null;
        //     }
        // }),
        Google({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (!profile?.email) {
                throw new Error('No profile');
            }
            const upsertUser: IUser = {
                firstName: profile.given_name,
                lastName: profile.family_name,
                email: profile.email,
                profilePicture: { public_id: profile.picture, url: profile.picture }
            }
            await connect();
            const user = await User.findOne({ email: profile.email });
            if (user) {
                await User.updateOne({ email: profile.email }, upsertUser);
                if (user.role === "Practicante") {
                    const fullName = user.firstName + " " + user.lastName;
                    const upsertPsychologist: IPsychologist = {
                        fullName: fullName,
                        gender: user.gender || "Indefinido",
                        profilePicture: user.profilePicture!.url,
                        user: user._id,
                        slug: slugify(fullName),
                        isPublic: true
                    }
                    const psychologist = await Psychologist.findOne({ user: user._id });
                    if (psychologist) {
                        console.log("Este psicólogo sí existe");
                        await Psychologist.updateOne({ user: user._id }, upsertPsychologist)
                    } else {
                        console.log("Este psicólogo no existe");
                        await Psychologist.create(upsertPsychologist);
                    }
                }
            } else {
                upsertUser.state = "activo";
                upsertUser.role = "Consultante";
                await User.create(upsertUser);
            }
            return true;
        },
        async jwt({ token, user, profile, trigger, session }) {
            if (trigger === "update") {
                console.log("Session es: " + JSON.stringify(session));
                console.log("Token es: " + JSON.stringify(token));
                token.user = await User.findOneAndUpdate({ email: token.email }, session, {new: true});
            }
            // console.log("llamando jwt");
            // console.log("El usuario es:" + JSON.stringify(token.user))
            // console.log("El perfil es:" + JSON.stringify(profile))
            // console.log("El token es:" + JSON.stringify(token))
            else if (user) {
                await connect();
                token.user = await User.findOne({ email: user.email });
            }
            return token;
        },
        session({ session, token, user }) {
            // console.log("llamando session");
            session.user = token.user as any;
            return session;
        }
    }
}

export default authOptions;