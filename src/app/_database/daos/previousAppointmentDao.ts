import { IPreviousAppointment } from "@/app/_interfaces/IPreviousAppointment";
import PreviousAppointment from "../models/PreviousAppointment";
import { connect } from "../connection";

export async function getPreviousAppointmentsByPsychologist(psychologist: string) {
    await connect();
    const appointments = await PreviousAppointment.find({ psychologist: psychologist }).lean();
    return appointments;
}

export async function getPreviousAppointmentsByPatient(patient: string) {
    await connect();
    const appointments = await PreviousAppointment.find({ patient: patient }).lean();
    return appointments;
}

export async function createPreviousAppointment(appointment: IPreviousAppointment) {
    await connect();
    const result = await PreviousAppointment.create(appointment);
    return result ? true : false;
}