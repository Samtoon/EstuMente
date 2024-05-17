"use server"
import { createPreviousAppointment } from "@/database/daos/previousAppointmentDao";
import { createRoom } from "@/database/daos/roomDao";
import { createUpcomingAppointment, deleteUpcomingAppointmentById, getOverdueUpcomingAppointments } from "@/database/daos/upcomingAppointmentDao";
import { IPreviousAppointment } from "@/interfaces/IPreviousAppointment";
import { IUpcomingAppointment } from "@/interfaces/IUpcomingAppointment";


export async function scheduleAppointment(user: string, psychologist: string, date: Date) {

    console.log("Llamaron a la acción milagrosa");
    console.log("Me llega la fecha: " + date);
    // const { startTimestamp: nbf, endTimestamp: exp } = localHourToTimestamps(hour, date.toISOString());
    const nbf = date.getTime() / 1000;
    const exp = new Date(date).setHours(date.getHours() + 1) / 1000;
    console.log("el room creado fue: ");
    const room = await createRoom(nbf, exp);
    console.log(room);
    // console.log(requestToken(room?.name!));
    const appointment: IUpcomingAppointment = {
        patient: user,
        psychologist: psychologist,
        date: date,
        roomName: (room?.name)!,
        roomURL: (room?.url)!
    };
    return await createUpcomingAppointment(appointment);
}export async function moveAppointment(upcomingAppointment: IUpcomingAppointment) {
    const previousAppointment: IPreviousAppointment = {
        _id: upcomingAppointment._id,
        date: upcomingAppointment.date,
        patient: upcomingAppointment.patient,
        psychologist: upcomingAppointment.psychologist
    };
    const result1 = await createPreviousAppointment(previousAppointment);
    const result2 = await deleteUpcomingAppointmentById(upcomingAppointment._id!);
    return result1 && result2;
}

export async function compareDates() {
    const appointments = await getOverdueUpcomingAppointments();
    appointments.map(async (appointment) => await moveAppointment(appointment));
    return appointments.length;
}

