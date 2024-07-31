"use server";

import { serialize } from "@/app/_database/connection";
import { getPsychologists } from "@/app/_database/daos/psychologistDao";
import { IPsychologist } from "@/app/_interfaces/IPsychologist";

export default async function fetchPsychologists() {
  const psychologists = await getPsychologists();
  return serialize(psychologists) as IPsychologist[];
}
