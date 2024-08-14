import { Grid } from "@mui/material";
import React, { FC } from "react";
// import { IPsychologist } from "../../interfaces";
import { PsychologistCard } from "./PsychologistCard";
import { IPsychologist } from "@/app/_interfaces/IPsychologist";
import { serialize } from "@/app/_database/connection";
import { getPsychologists } from "@/app/_database/daos/psychologistDao";

interface Props {
  psychologists: IPsychologist[];
}

export const PsychologistList = async () => {
  console.log("Hola, soy la lista");
  const psychologists = serialize(await getPsychologists()) as IPsychologist[];
  return (
    <Grid container spacing={4}>
      {psychologists.map((psychologist) => (
        <PsychologistCard psychologist={psychologist} key={psychologist.slug} />
      ))}
    </Grid>
  );
};