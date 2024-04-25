"use server"

import { createPreviousAppointment } from "@/database/daos/previousAppointmentDao";
import { createRoom, localHourToTimestamps } from "@/database/daos/roomDao";
import { createUpcomingAppointment, deleteUpcomingAppointmentById } from "@/database/daos/upcomingAppointmentDao";
import UpcomingAppointment from "@/database/models/UpcomingAppointment";
import { IPreviousAppointment } from "@/interfaces/IPreviousAppointment";
import { IUpcomingAppointment } from "@/interfaces/IUpcomingAppointment";

export async function pruebaServerAction(formData: FormData) {
    console.log("Hola, te saludo desde el servidor. Si funciona, esto es impresionante...: " + formData.get("Celular"));

}

export async function scheduleAppointment(user: string, psychologist: string, date: Date, hour: number) {
    const appointment: IUpcomingAppointment = {
        user: user,
        psychologist: psychologist,
        date: date,
        hour: hour
    }
    console.log("Llamaron a la acción milagrosa");
    const {startTimestamp: nbf, endTimestamp: exp} = localHourToTimestamps(hour);
    await createRoom(nbf, exp);
    return await createUpcomingAppointment(appointment);
}

export async function moveAppointment( upcomingAppointment: IUpcomingAppointment ) {
    const previousAppointment: IPreviousAppointment = {
        date: upcomingAppointment.date,
        hour: upcomingAppointment.hour,
        patient: upcomingAppointment.user,
        psychologist: upcomingAppointment.psychologist
    }
    const result1 = await createPreviousAppointment(previousAppointment);
    const result2 = await deleteUpcomingAppointmentById(upcomingAppointment._id!);
    return result1 && result2;
}

export async function compareDates() {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date();
    endDate.setHours(23, 0, 0, 0);
    const appointment = await UpcomingAppointment.findOne({ date: {$gte: startDate, $lte: endDate}});
    
}

