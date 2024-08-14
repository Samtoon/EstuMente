import { IPreviousAppointment } from "@/app/_interfaces/IPreviousAppointment";
import PreviousAppointment from "../models/PreviousAppointment";
import { connect } from "../connection";
import {
  filterAppointmentsByPsychologistPipeline,
  filterYearlyActivePatientsPipeline,
} from "../aggregation pipelines/previousAppointment";
import PatientFilters from "@/app/_enums/reports/PatientFilters";
import { IReportResult } from "@/app/_interfaces/IReportResult";
import mongoose from "mongoose";

export async function getPreviousAppointmentsByPsychologist(
  psychologist: string
) {
  await connect();
  const appointments = await PreviousAppointment.find({
    psychologist: psychologist,
  }).lean();
  return appointments;
}

export async function getPreviousAppointmentsByPatient(patient: string) {
  await connect();
  const appointments = await PreviousAppointment.find({
    patient: patient,
  }).lean();
  return appointments;
}

export async function getPreviousAppointmentById(id: string) {
  await connect();
  const appointment = await PreviousAppointment.findById(id).lean();
  return appointment;
}

export async function createPreviousAppointment(
  appointment: IPreviousAppointment
) {
  await connect();
  const result = await PreviousAppointment.create(appointment);
  return result ? true : false;
}

export async function updatePreviousAppointment(
  appointment: Partial<IPreviousAppointment>
) {
  await connect();
  const result = await PreviousAppointment.updateOne(
    { _id: new mongoose.Types.ObjectId(appointment._id) },
    appointment
  );
  console.log("Se actualizaron", result.modifiedCount, "citas");
  return Boolean(result.modifiedCount);
}

export async function filterYearlyActivePatients(
  filter: PatientFilters,
  year: number
) {
  await connect();
  const results: IReportResult[] = await PreviousAppointment.aggregate(
    filterYearlyActivePatientsPipeline(filter, year)
  );
  return results;
}

export async function filterAppointmentsByPsychologist(
  filter: PatientFilters,
  psychologist?: string
) {
  await connect();
  const results: IReportResult[] = await PreviousAppointment.aggregate(
    filterAppointmentsByPsychologistPipeline(filter, psychologist)
  );
  return results;
}
