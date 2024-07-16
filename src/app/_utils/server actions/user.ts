"use server"

import { serialize } from "@/app/_database/connection";
import { getUserById } from "@/app/_database/daos/userDao"
import IUser from "@/app/_interfaces/IUser";

export async function fetchUserById(id: string) {
    const user = await getUserById(id);
    return serialize(user) as IUser;
}