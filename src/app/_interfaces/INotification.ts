import { Schema } from "mongoose";
import Roles from "../_enums/Roles";
import { ReceiverTypes } from "../_enums/ReceiverTypes";
import { NotificationTypes } from "../_enums/NotificationTypes";

export interface INotification {
    _id?: Schema.Types.ObjectId | string,
    image?: string,
    receiver: {
        type: ReceiverTypes,
        id: Schema.Types.ObjectId | string,
    },
    body: string,
    createdAt?: Date,
    simpleClear: boolean,
    condition?: {
        notificationType: NotificationTypes,
        clues: string[]
    }
}