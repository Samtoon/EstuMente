import mongoose, { Schema } from "mongoose";
import { Service } from "./models/Service";
import User from "./models/User";
import Psychologist from "./models/Psychologist";
import Schedule from "./models/Schedule";
import { ISchedule } from "@/interfaces/schedule/ISchedule";
import { IDay } from "@/interfaces/schedule/IDay";

async function connect() {
  if (mongoose.connection.readyState !== 1) {
    console.log("No existe una conexión, intentando crear una...");
    try {
      await mongoose.connect(process.env.DB_URL!);
      console.log("Conexión exitosa")
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("Ya existe una conexión");
  }
}

function myFunction(service: any) {
  return service.name;
}

function fullName(user: any) {
  return user.email;
}



async function fetchServices() {
  await connect();
  const oneService = await Service.find();
  const oneService2 = oneService.map(myFunction);
  console.log(oneService);
  return oneService2 + "";
}

async function fetchUsers() {
  await connect();
  const oneUser = await User.find();
  const oneUser2 = oneUser.map(fullName);
  console.log(oneUser);
  return oneUser2 + "";
}

async function fetchPsychologists() {
  await connect();
  const psychologists = await Psychologist.find().lean();
  psychologists.forEach((psychologist) => {
    psychologist._id = psychologist._id.toString();
    psychologist.user = psychologist.user.toString();
  })
  return psychologists;
}

async function getScheduleByEmail(email: string) {
  await connect();
  const user = await User.findOne({ email: email }, "_id").lean();
  const psychologist = await Psychologist.findOne({ user: user?._id.toString() }, "_id").lean();
  const schedule = await Schedule.findOne({ psychologist: psychologist?._id.toString()}).lean();
  console.log("Encontré esto:");
  console.log(schedule);
  return schedule;
}

async function setScheduleByEmail(email: string, schedule: IDay[]) {
  await connect();
  const user = await User.findOne({ email: email }, "_id").lean();
  const psychologist = await Psychologist.findOne({ user: user?._id.toString() }, "_id").lean();
  await Schedule.updateOne({ psychologist: psychologist?._id.toString() }, {days: schedule}, {upsert: true});
  console.log("Actualizado con éxito");
}

async function getScheduleById(id: string) {
  await connect();
  const schedule = await Schedule.findOne({ psychologist: id }).lean();
  return schedule;
}

function serialize(object: mongoose.FlattenMaps<any>) {
  return JSON.parse(JSON.stringify(object));
}

export { connect, fetchServices, fetchUsers, fetchPsychologists, getScheduleByEmail, setScheduleByEmail, getScheduleById, serialize };