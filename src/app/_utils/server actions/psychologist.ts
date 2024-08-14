"use server";

import { getPsychologists } from "@/app/_database/daos/psychologistDao";

export default async function fetchPsychologists() {
  const psychologists = await getPsychologists();
  return psychologists;
}
