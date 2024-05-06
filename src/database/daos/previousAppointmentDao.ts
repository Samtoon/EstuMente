import { IPreviousAppointment } from "@/interfaces/IPreviousAppointment";
import PreviousAppointment from "../models/PreviousAppointment";

export async function getPreviousAppointmentsByPsychologist(psychologist: string) {
    const appointments = await PreviousAppointment.find({ psychologist: psychologist }).lean();
    return appointments;
}

export async function getPreviousAppointmentsByPatient(patient: string) {
    const appointments = await PreviousAppointment.find({ patient: patient }).lean();
    return appointments;
}

export async function createPreviousAppointment(appointment: IPreviousAppointment) {
    const result = await PreviousAppointment.create(appointment);
    return result ? true : false;
}