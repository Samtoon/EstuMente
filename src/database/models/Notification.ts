import { INotification } from "@/interfaces/INotification";
import mongoose, { Model, Schema, model } from "mongoose";

const notificationSchema = new Schema<INotification>({
    image: String,
    user: Schema.Types.ObjectId,
    body: String
}, { timestamps: true });

const Notification: Model<INotification> = mongoose.models.Notification || model("Notification", notificationSchema);

export default Notification;