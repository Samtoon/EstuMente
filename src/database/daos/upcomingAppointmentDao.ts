import { IUpcomingAppointment } from "@/interfaces/IUpcomingAppointment";
import UpcomingAppointment from "../models/UpcomingAppointment";

export async function getUpcomingAppointmentsByPsychologist( psychologist: string ) {
    const appointments = await UpcomingAppointment.find({ psychologist: psychologist }).lean();
    return appointments;
}

export async function createUpcomingAppointment( upcomingAppointment: IUpcomingAppointment ) {
    const result = await UpcomingAppointment.create(upcomingAppointment);
    return result ? true : false;
}