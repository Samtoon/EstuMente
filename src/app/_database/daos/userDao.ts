import IUser from "@/app/_interfaces/IUser";
import { connect } from "../connection";
import User, { agePipeline } from "../models/User";
import { Aggregate } from "mongoose";

export async function getUserById(id: string) {
    await connect();
    const user: IUser[] = await User.aggregate(agePipeline).match({_id: id});
    return user[0];
}

export async function getUserByEmail(email: string) {
    await connect();
    // const user = await User.findOne({ email: email }).lean();
    const user: IUser[] = await User.aggregate(agePipeline).match({email});
    console.log(user[0]);
    return user[0];
}

export async function updateUserByEmail(email: string, user: Partial<IUser>) {
    await connect();
    const result = await User.updateOne({email: email}, user);
    return Boolean(result.modifiedCount);
}

export async function updateUserById(id: string, user: Partial<IUser>) {
    await connect();
    const result = await User.updateOne({_id: id}, user);
    return Boolean(result.modifiedCount);
}

export async function createUser(user: IUser) {
    await connect();
    const result = await User.create(user);
    return Boolean(result);
}

export async function getUpdatedUserByEmail(email: string, user: IUser) {
    await connect();
    await updateUserByEmail(email, user);
    const updatedUser = await getUserByEmail(email);
    return updatedUser;
}

