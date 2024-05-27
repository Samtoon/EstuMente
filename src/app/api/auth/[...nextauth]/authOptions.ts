import { createPsychologist, getPsychologistByUser, updatePsychologistByUser } from "@/app/_database/daos/psychologistDao";
import { createUser, getUpdatedUserByEmail, getUserByEmail, updateUserByEmail } from "@/app/_database/daos/userDao";
import { IPsychologist } from "@/app/_interfaces/IPsychologist";
import IUser from "@/app/_interfaces/IUser";
import { NextAuthOptions } from "next-auth"
import Google from "next-auth/providers/google";
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
            // await connect();
            // const user = await User.findOne({ email: profile.email });
            const user = await getUserByEmail(profile.email);
            if (user) {
                // await User.updateOne({ email: profile.email }, upsertUser);
                await updateUserByEmail(profile.email, upsertUser);
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
                    // const psychologist = await Psychologist.findOne({ user: user._id });
                    const psychologist = await getPsychologistByUser(user._id);
                    if (psychologist) {
                        console.log("Este psicólogo sí existe");
                        // await Psychologist.updateOne({ user: user._id }, upsertPsychologist)
                        await updatePsychologistByUser(user._id, upsertPsychologist);
                    } else {
                        console.log("Este psicólogo no existe");
                        // await Psychologist.create(upsertPsychologist);
                        await createPsychologist(upsertPsychologist);
                    }
                }
            } else {
                upsertUser.state = "activo";
                upsertUser.role = "Consultante";
                // await User.create(upsertUser);
                await createUser(upsertUser);
            }
            return true;
        },
        async jwt({ token, user, profile, trigger, session }) {
            if (trigger === "update") {
                console.log("Session es: " + JSON.stringify(session));
                console.log("Token es: " + JSON.stringify(token));
                // token.user = await User.findOneAndUpdate({ email: token.email }, session, {new: true});
                token.user = await getUpdatedUserByEmail(token.email!, session);
            }
            // console.log("llamando jwt");
            // console.log("El usuario es:" + JSON.stringify(token.user))
            // console.log("El perfil es:" + JSON.stringify(profile))
            // console.log("El token es:" + JSON.stringify(token))
            else if (user) {
                // const dbUser = await User.findOne({ email: user.email });
                const dbUser = await getUserByEmail(user.email as string);
                token.user = dbUser;
                // token.psychologist = await Psychologist.findOne({ user: dbUser?._id })
                token.psychologist = await getPsychologistByUser(dbUser?._id!);
            }
            return token;
        },
        session({ session, token, user }) {
            // console.log("llamando session");
            session.user = token.user as IUser;
            session.psychologist = token.psychologist as IPsychologist;
            return session;
        }
    }
}

export default authOptions;