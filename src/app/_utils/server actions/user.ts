"use server";

import {
  getAssignedUsersById,
  getUserById,
  updateUserById,
} from "@/app/_database/daos/userDao";
import IUser from "@/app/_interfaces/IUser";
import { UpdateQuery } from "mongoose";

export async function fetchUserById(id: string) {
  const user = await getUserById(id);
  return user;
}

export async function fetchAssignedUsersById(id: string) {
  const users = await getAssignedUsersById(id);
  return users;
}

export async function saveUserById(id: string, user: UpdateQuery<IUser>) {
  const result = await updateUserById(id, user);
  return result;
}
