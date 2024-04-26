"use client"

import { Calification } from "@/components/appointments/Calification";
import { PsychologistDidNotAttend } from "@/components/appointments/PsychologistDidNotAttend";
import PatientLayout from "@/components/layout/PatientLayout";
import { Call } from "@/components/video/Call";
import CallDisplay from "@/components/video/CallDisplay";
import { EndCall } from "@/components/video/EndCall";
import { getUpcomingAppointmentById } from "@/database/daos/upcomingAppointmentDao";
import { IUpcomingAppointment } from "@/interfaces/IUpcomingAppointment";
import { Box, Container, Typography } from "@mui/material";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const prueba = "https://estumente.daily.co/prueba";

interface Props {
  params: { id: string }
}

const MeetPage: NextPage<Props> = async ({ params }) => {
  // const router = useRouter();
  const appointment = await getUpcomingAppointmentById(params.id);
  return (
    <PatientLayout title="Sesión" pageDescription="Sesión iniciada">
      <CallDisplay appointment={appointment!}/>
    </PatientLayout>
  );
};

export default MeetPage;
