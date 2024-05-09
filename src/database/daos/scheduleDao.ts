import { IDay } from "@/interfaces/schedule/IDay";
import { connect } from "../connection";
import Schedule from "../models/Schedule";

console.log("Entro al DAO de horarios");

export async function getScheduleByPsychologist(psychologist: string) {
  await connect();
  const schedule = await Schedule.findOne({ psychologist: psychologist }).lean();
  return schedule;
}

export async function updateScheduleByPsychologist(psychologist: string, schedule: IDay[]) {
  await connect();
  await Schedule.updateOne({ psychologist: psychologist }, { days: schedule }, { upsert: true });
}

export async function getScheduleById(id: string) {
  await connect();
  const schedule = await Schedule.findOne({ psychologist: id }).lean();
  return schedule;
}
