"use server"
import { serialize } from "@/database/connection"
import { createNotification, deleteNotificationById, getNotificationsByUser } from "@/database/daos/notificationDao"
import Notification from "@/database/models/Notification"
import { INotification } from "@/interfaces/INotification"
import { pusherServer } from "@/lib/pusher"

export async function sendNotification(user: string, body: string, image?: string, ) {
    const notification: INotification = {
        image: image,
        user: user,
        body: body
    }
    const dbNotification = await createNotification(notification);
    console.log("Hago el trigger");
    pusherServer.trigger(user, "event", serialize(dbNotification));
    return Boolean(dbNotification);
}

export async function fetchNotificationsByUser(user: string) {
    const notifications = await getNotificationsByUser(user);
    return serialize(notifications) as INotification[];
}

export async function clearNotificationById(id: string) {
    return await deleteNotificationById(id);
}