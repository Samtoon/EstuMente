"use server"

import { createRoom, localHourToTimestamps } from "@/database/daos/roomDao";
import { createUpcomingAppointment } from "@/database/daos/upcomingAppointmentDao";
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

