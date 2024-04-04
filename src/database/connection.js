import mongoose, { Schema } from "mongoose";
import { Service } from "./models/Service";
import User from "./models/User";
import Psychologist from "./models/Psychologist";

async function connect() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Conexión exitosa")
  } catch (error) {
    console.log(error);
  }

}

function myFunction(service) {
  return service.name;
}

function fullName(user) {
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
  const psychologists = await Psychologist.find();
  return psychologists;
}

export { connect, fetchServices, fetchUsers, fetchPsychologists };