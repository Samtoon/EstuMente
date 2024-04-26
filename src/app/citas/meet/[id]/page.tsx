import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { Calification } from "@/components/appointments/Calification";
import { PsychologistDidNotAttend } from "@/components/appointments/PsychologistDidNotAttend";
import PatientLayout from "@/components/layout/PatientLayout";
import { Call } from "@/components/video/Call";
import CallDisplay from "@/components/video/CallDisplay";
import { EndCall } from "@/components/video/EndCall";
import { serialize } from "@/database/connection";
import { getUpcomingAppointmentById } from "@/database/daos/upcomingAppointmentDao";
import { IUpcomingAppointment } from "@/interfaces/IUpcomingAppointment";
import { requestToken } from "@/utils/actions";
import { Box, Container, Typography } from "@mui/material";
import { NextPage } from "next";
import { getServerSession } from "next-auth";
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
  console.log("El appointment que recibo es:");
  console.log(appointment);
  const session = await getServerSession(authOptions);
  console.log("Y esta es la session");
  console.log(session?.user);
  // console.log(`comparando los ids ${session?.user._id} y ${appointment?.user}, el resultado es ${session?.user._id == appointment?.user}
  // y sus tipos son ${typeof session?.user._id} y ${typeof appointment?.user}`);
  const token = session?.user._id === appointment?.user.toString() ? 
  await requestToken(appointment?.roomName!) :
  "";
  return (
    <PatientLayout title="Sesión" pageDescription="Sesión iniciada">
      <CallDisplay appointment={serialize(appointment!)} token={token!}/>
    </PatientLayout>
  );
};

export default MeetPage;
