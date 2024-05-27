import { Schema } from "mongoose";

export interface INotification {
    _id?: Schema.Types.ObjectId | string,
    image?: string,
    user: Schema.Types.ObjectId | string,
    body: string
    createdAt?: Date
}