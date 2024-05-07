"use server"

import { createPreviousAppointment } from "@/database/daos/previousAppointmentDao";
import { createRoom, localHourToTimestamps } from "@/database/daos/roomDao";
import { createUpcomingAppointment, deleteUpcomingAppointmentById } from "@/database/daos/upcomingAppointmentDao";
import Appointment from "@/database/models/Appointment";
import UpcomingAppointment from "@/database/models/UpcomingAppointment";
import { IPreviousAppointment } from "@/interfaces/IPreviousAppointment";
import { IUpcomingAppointment } from "@/interfaces/IUpcomingAppointment";
import { dailyHeaders } from "./constants";
import { DAILY_API_URL } from "./endpoints";
import { createNote, getNotesByDate, getNotesByPatient, getNotesByTitle, updateNote } from "@/database/daos/noteDao";
import { serialize } from "@/database/connection";
import { INote } from "@/interfaces/INote";
import NoteFilters from "@/enums/NoteFilters";
import { title } from "process";
import { getColombianHour } from "./hour";

export async function pruebaServerAction(formData: FormData) {
    console.log("Hola, te saludo desde el servidor. Si funciona, esto es impresionante...: " + formData.get("Celular"));

}

export async function scheduleAppointment(user: string, psychologist: string, date: Date, hour: number) {

    console.log("Llamaron a la acción milagrosa");
    const { startTimestamp: nbf, endTimestamp: exp } = localHourToTimestamps(hour, date.toISOString());
    console.log("el room creado fue: ");
    const room = await createRoom(nbf, exp);
    console.log(room);
    console.log(requestToken(room?.name!));
    const appointment: IUpcomingAppointment = {
        user: user,
        psychologist: psychologist,
        date: date,
        hour: hour,
        roomName: room?.name!,
        roomURL: room?.url!
    }
    return await createUpcomingAppointment(appointment);
}

export async function moveAppointment(upcomingAppointment: IUpcomingAppointment) {
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
    console.log("Estoy buscando la hora: " + getColombianHour() + "entre las fechas: " + startDate + " y " + endDate);
    const appointments = await UpcomingAppointment.find({
        date: { $lte: endDate },
        hour: { $lt: getColombianHour() }
    }).lean();
    appointments.map(async (appointment) => await moveAppointment(appointment));
}
export async function requestToken(roomName: string) {
    const body = {
        properties: {
            room_name: roomName
        }
    };
    const response = await fetch(`${DAILY_API_URL}meeting-tokens`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: dailyHeaders,
    });
    console.log(response);
    if (!response.ok) return null;
    const { token }: { token: string; } = await response.json();
    console.log("El token es: " + token);
    return token;
}

export async function fetchNotesByPatient(psychologist: string, patient: string) {
    console.log("fetch notes, con " + psychologist + " y " + patient);
    const notes = await getNotesByPatient(psychologist, patient);
    return serialize(notes) as INote[];
}

export async function saveNote(note: INote) {
    if (note._id) {
        return await updateNote(note);
    } else {
        return await createNote(note);
    }
}

export async function filterNotes(
    psychologist: string,
    patient: string,
    filter: string | Date,
    filterBy: NoteFilters
) {
    console.log("Filter es: " + filter);
    let notes: INote[] = [];
    switch (filterBy) {
        case NoteFilters.Title:
            notes = (filter as string).length === 0 ?
                await getNotesByPatient(psychologist, patient) :
                await getNotesByTitle(psychologist, patient, filter as string);
            break;
        case NoteFilters.Date:
            notes = await getNotesByDate(psychologist, patient, filter as Date);
            break;
        // case NoteFilters.Patient:
    }
    console.log("voy a mandar:" + notes);
    return serialize(notes) as INote[];
}

