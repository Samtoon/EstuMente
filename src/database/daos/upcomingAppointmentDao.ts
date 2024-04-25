import { IUpcomingAppointment } from "@/interfaces/IUpcomingAppointment";
import UpcomingAppointment from "../models/UpcomingAppointment";
import { connect, serialize } from "../connection";

export async function getUpcomingAppointmentsByPsychologist( psychologist: string ) {
    await connect();
    const appointments = await UpcomingAppointment.find({ psychologist: psychologist }).lean();
    console.log("Ejemplo");
    console.log(appointments[0])
    return appointments;
}

export async function getUpcomingAppointmentsByUser( user: string ) {
    await connect();
    const appointments = await UpcomingAppointment.find({ user: user }).lean();
    console.log("Ejemplo");
    console.log(appointments[0])
    return appointments;
}

export async function createUpcomingAppointment( upcomingAppointment: IUpcomingAppointment ) {
    const result = await UpcomingAppointment.create(upcomingAppointment);
    console.log("La cita insertada es");
    console.log(result);
    return serialize(await getUpcomingAppointmentsByPsychologist(upcomingAppointment.psychologist));
}

export async function deleteUpcomingAppointmentById( id: string ) {
    const result = await UpcomingAppointment.deleteOne({ _id: id });
    return result.deletedCount > 0;
}