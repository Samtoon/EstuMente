import { IDay } from "@/interfaces/schedule/IDay";
import Psychologist from "../models/Psychologist";
import User from "../models/User";
import { connect } from "../connection";
import Schedule from "../models/Schedule";


export async function getScheduleByEmail(email: string) {
  await connect();
  const user = await User.findOne({ email: email }, "_id").lean();
  const psychologist = await Psychologist.findOne({ user: user?._id.toString() }, "_id").lean();
  const schedule = await Schedule.findOne({ psychologist: psychologist?._id.toString() }).lean();
  console.log("Encontré esto:");
  console.log(schedule);
  return schedule;
}

export async function getScheduleByPsychologist(psychologist: string) {
  await connect();
  const schedule = await Schedule.findOne({ psychologist: psychologist }).lean();
  return schedule;
}

export async function updateScheduleByPsychologist(psychologist: string, schedule: IDay[]) {
  await connect();
  await Schedule.updateOne({ psychologist: psychologist }, { days: schedule }, { upsert: true });
}

export async function setScheduleByEmail(email: string, schedule: IDay[]) {
  await connect();
  const user = await User.findOne({ email: email }, "_id").lean();
  const psychologist = await Psychologist.findOne({ user: user?._id.toString() }, "_id").lean();
  await Schedule.updateOne({ psychologist: psychologist?._id.toString() }, { days: schedule }, { upsert: true });
  console.log("Actualizado con éxito");
}

export async function getScheduleById(id: string) {
  await connect();
  const schedule = await Schedule.findOne({ psychologist: id }).lean();
  return schedule;
}
