import { INotification } from "@/interfaces/INotification";
import Notification from "../models/Notification";

export async function getNotificationsByUser(user: string) {
    console.log("Llaman al notifications");
    const notifications = await Notification.find({ user: user }).sort({createdAt: -1}).lean();
    return notifications;
}

export async function createNotification(notification: INotification) {
    const result = await Notification.create(notification);
    return Boolean(result);
}

export async function deleteNotificationById(id: string) {
    const result = await Notification.deleteOne({ _id: id });
    return Boolean(result.deletedCount);
}