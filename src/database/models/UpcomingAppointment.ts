import { IUpcomingAppointment } from "@/interfaces/IUpcomingAppointment";
import mongoose, { Model, Schema, model } from "mongoose";

const upcomingAppointmentSchema = new Schema({
    user: Schema.Types.ObjectId,
    psychologist: Schema.Types.ObjectId,
    date: Date,
    roomName: String,
    roomURL: String
});

const UpcomingAppointment: Model<IUpcomingAppointment> = mongoose.models.UpcomingAppointment || model("UpcomingAppointment", upcomingAppointmentSchema);

export default UpcomingAppointment;