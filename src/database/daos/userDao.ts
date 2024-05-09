import IUser from "@/interfaces/IUser";
import { connect } from "../connection";
import User from "../models/User";

export async function getUserById(id: string) {
    await connect();
    const user = await User.findById(id).lean();
    return user;
}

export async function getUserByEmail(email: string) {
    await connect();
    const user = await User.findOne({ email: email }).lean();
    return user;
}

export async function updateUserByEmail(email: string, user: IUser) {
    await connect();
    const result = await User.updateOne({email: email}, user);
    return Boolean(result.modifiedCount);
}

export async function createUser(user: IUser) {
    await connect();
    const result = await User.create(user);
    return Boolean(result);
}

export async function getUpdatedUserByEmail(email: string, user: IUser) {
    await connect();
    const updatedUser = await User.findOneAndUpdate({ email: email }, user, {new: true}).lean();
    return updatedUser;
}

