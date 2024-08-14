import { IPsychologist } from "@/app/_interfaces/IPsychologist";
import { NextPage } from "next";
import { useRouter } from "next/navigation";

import React, { useContext, useEffect, useState } from "react";
// import { getSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { NextPage, GetServerSideProps } from "next";
import PatientLayout from "@/app/_components/layout/PatientLayout";
import PsychologistDisplay from "@/app/_components/appointments/Display";
import ModalBox from "@/app/_components/appointments/ModalBox";
import { getPsychologistBySlug } from "@/app/_database/daos/psychologistDao";
import { serialize } from "@/app/_database/connection";
import Box from "@mui/material/Box/Box";
import AppointmentDatePicker from "@/app/_components/appointments/AppointmentDatePicker";

interface Props {
  //   psychologist: IPsychologist;
  //   services: IService[];
  params: { slug: string };
}

const ScheduleAppointmentPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const psychologist = await getPsychologistBySlug(params.slug);
  return (
    <PatientLayout title="Agendar cita" pageDescription="Agendar cita">
      <Box sx={{ margin: "80px auto", padding: "0px 30px" }}>
        {psychologist && (
          <PsychologistDisplay psychologist={serialize(psychologist)} />
        )}
        {/* <ModalBox /> */}
      </Box>
    </PatientLayout>
  );
};

export default ScheduleAppointmentPage;
