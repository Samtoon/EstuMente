import { IPsychologist } from "@/app/_interfaces/IPsychologist";
import Psychologist from "../models/Psychologist";
import { connect, serialize } from "../connection";
import { unstable_noStore as noStore } from "next/cache";
import { getPsychologistsByTutorPipeline } from "../aggregation pipelines/psychologist";

export async function getPsychologists() {
  noStore();
  await connect();
  const psychologists = await Psychologist.find().lean();
  return serialize(psychologists) as IPsychologist[];
}

export async function getPsychologistsByTutor(tutorId: string) {
  await connect();
  const psychologists = await Psychologist.aggregate(
    getPsychologistsByTutorPipeline(tutorId),
  );
  return serialize(psychologists) as IPsychologist[];
}

export async function getPsychologistBySlug(slug: string) {
  await connect();
  const psychologist = await Psychologist.findOne({ slug: slug }).lean();
  return serialize(psychologist) as IPsychologist;
}

export async function getPsychologistById(id: string) {
  await connect();
  const psychologist = await Psychologist.findById(id).lean();
  return serialize(psychologist) as IPsychologist;
}

export async function getPsychologistByUser(user: string) {
  await connect();
  const psychologist = await Psychologist.findOne({ user: user }).lean();
  console.log("Psicólogo:");
  console.log(psychologist);
  return serialize(psychologist) as IPsychologist;
}

export async function updatePsychologistByUser(
  user: string,
  psychologist: IPsychologist,
) {
  await connect();
  const result = await Psychologist.updateOne({ user: user }, psychologist);
  return Boolean(result.modifiedCount);
}

export async function createPsychologist(psychologist: IPsychologist) {
  await connect();
  const result = await Psychologist.create(psychologist);
  return Boolean(result);
}
