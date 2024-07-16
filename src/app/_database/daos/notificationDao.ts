import { INotification } from "@/app/_interfaces/INotification";
import Notification from "../models/Notification";
import { connect } from "../connection";
import Roles from "@/app/_enums/Roles";
import { ReceiverTypes } from "@/app/_enums/ReceiverTypes";
import { FilterQuery } from "mongoose";

export async function getNotificationsByUser(user: string, role: Roles) {
    await connect();
    console.log("Llaman al notifications con", user,"y",role);
    const query: FilterQuery<INotification> = {$or: [
        {"receiver.id": user},
        {"receiver.id": role}
    ]}
    console.log(query.$or![0]);
    const notifications = await Notification.find(
        query
    ).sort({createdAt: -1}).lean();
    console.log("Resultados:",notifications.length);
    return notifications;
}

export async function createNotification(notification: INotification) {
    await connect();
    const result = await Notification.create(notification);
    return result;
}

export async function deleteNotificationById(id: string) {
    await connect();
    const result = await Notification.deleteOne({ _id: id });
    return Boolean(result.deletedCount);
}