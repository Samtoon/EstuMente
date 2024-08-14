import { IUpcomingAppointment } from "@/app/_interfaces/IUpcomingAppointment";
import UpcomingAppointment from "../models/UpcomingAppointment";
import { connect, serialize } from "../connection";
import mongoose from "mongoose";

console.log("Entro al DAO de citas");

export async function getUpcomingAppointmentsByPsychologist(
  psychologist: string
) {
  await connect();
  console.log("Trayendo appointments desde el DAO");
  const appointments = await UpcomingAppointment.find({
    psychologist: psychologist,
  }).lean();
  // console.log("Ejemplo");
  // console.log(appointments[0])
  console.log(
    "Encontrados " + appointments + " appointments. Saliendo del DAO..."
  );
  return appointments;
}

export async function getUpcomingAppointmentsByPatient(patient: string) {
  await connect();
  console.log("Trayendo appointments desde el DAO");
  const appointments = await UpcomingAppointment.find({
    patient: patient,
  }).lean();
  // console.log("Ejemplo");
  // console.log(appointments[0])
  console.log(
    "Encontrados " + appointments + " appointments. Saliendo del DAO..."
  );
  return appointments;
}

export async function getUpcomingAppointmentById(id: string) {
  await connect();
  const appointment = await UpcomingAppointment.findById(id).lean();
  return appointment;
}

export async function createUpcomingAppointment(
  upcomingAppointment: IUpcomingAppointment
) {
  await connect();
  const result = await UpcomingAppointment.create(upcomingAppointment);
  console.log("La cita insertada es");
  console.log(result);
  return serialize(
    await getUpcomingAppointmentsByPsychologist(
      upcomingAppointment.psychologist
    )
  );
}

export async function updateUpcomingAppointment(
  appointment: Partial<IUpcomingAppointment>
) {
  await connect();
  const result = await UpcomingAppointment.updateOne(
    { _id: new mongoose.Types.ObjectId(appointment._id) },
    appointment
  );
  console.log("Se actualizaron", result.modifiedCount, "citas");
  return Boolean(result.modifiedCount);
}

export async function deleteUpcomingAppointmentById(id: string) {
  await connect();
  console.log("Borrando la cita: " + id);
  const result = await UpcomingAppointment.deleteOne({ _id: id });
  return result.deletedCount > 0;
}

export async function getOverdueUpcomingAppointments() {
  await connect();
  const date = new Date();
  date.setMinutes(0, 0, 0);
  const appointments = await UpcomingAppointment.find({
    date: { $lt: date },
  }).lean();
  console.log("Hay " + appointments.length + " citas atrasadas");
  return appointments;
}
