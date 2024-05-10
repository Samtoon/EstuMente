"use server"

import { createPreviousAppointment } from "@/database/daos/previousAppointmentDao";
import { createRoom } from "@/database/daos/roomDao";
import { localHourToTimestamps } from "./hour";
import { createUpcomingAppointment, deleteUpcomingAppointmentById, getOverdueUpcomingAppointments } from "@/database/daos/upcomingAppointmentDao";
import { IPreviousAppointment } from "@/interfaces/IPreviousAppointment";
import { IUpcomingAppointment } from "@/interfaces/IUpcomingAppointment";
import { dailyHeaders } from "./constants";
import { DAILY_API_URL } from "./endpoints";
import { createNote, getNotesByDate, getNotesByPatient, getNotesByTitle, updateNote } from "@/database/daos/noteDao";
import { serialize } from "@/database/connection";
import { INote } from "@/interfaces/INote";
import NoteFilters from "@/enums/NoteFilters";

export async function pruebaServerAction(formData: FormData) {
    console.log("Hola, te saludo desde el servidor. Si funciona, esto es impresionante...: " + formData.get("Celular"));

}

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
        user: user,
        psychologist: psychologist,
        date: date,
        roomName: room?.name!,
        roomURL: room?.url!
    }
    return await createUpcomingAppointment(appointment);
}

export async function moveAppointment(upcomingAppointment: IUpcomingAppointment) {
    const previousAppointment: IPreviousAppointment = {
        date: upcomingAppointment.date,
        patient: upcomingAppointment.user,
        psychologist: upcomingAppointment.psychologist
    }
    const result1 = await createPreviousAppointment(previousAppointment);
    const result2 = await deleteUpcomingAppointmentById(upcomingAppointment._id!);
    return result1 && result2;
}

export async function compareDates() {
    const appointments = await getOverdueUpcomingAppointments();
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

