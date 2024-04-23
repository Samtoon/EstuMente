"use client"
// import { useState } from "react";
// import { GetServerSideProps, NextPage } from "next";
// import { getSession } from "next-auth/react";
// import { useRouter } from "next/router";

import { Calification } from "@/components/appointments/Calification";
import { PsychologistDidNotAttend } from "@/components/appointments/PsychologistDidNotAttend";
import PatientLayout from "@/components/layout/PatientLayout";
import { Call } from "@/components/video/Call";
import { EndCall } from "@/components/video/EndCall";
import { IUpcomingAppointment } from "@/interfaces/IUpcomingAppointment";
import { Box, Container, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";

// import { Box, Container, Typography } from "@mui/material";

// import { IAppointment } from "../../../../interfaces";
// import { dbAppointment } from "../../../../database";
// import { toast } from "react-toastify";
// import { VideoLayout } from "../../../../components/layout";
// import { Call, EndCall } from "../../../../components/video";
// import {
//   Calification,
//   PsychologistDidNotAttend,
// } from "../../../../components/appointment";

interface Props {
  appointment: IUpcomingAppointment;
  fullName: string;
  appointmentId: string;
}

const MeetPage: NextPage<Props> = ({
  appointment,
  fullName,
  appointmentId,
}) => {
  // const router = useRouter();
  const router = useRouter();

  const refreshData = () => {
    router.refresh();
  };

  // const [room, setRoom] = useState(
  //   appointment.dailyUrl ? appointment.dailyUrl : null
  // );
  const [room, setRoom] = useState(null);
  const [callFrame, setCallFrame] = useState(null);

  return (
    <PatientLayout title="Sesión" pageDescription="Sesión iniciada">
      <Box>
        {/* appointment.endTime >= Date.now() / 1000 */false  ? (
          /* appointment.startTime <= Date.now() / 1000 */true  ? (
            room !== null ? (
              <Call
                room={room}
                setRoom={setRoom}
                setCallFrame={setCallFrame}
                callFrame={callFrame}
                userName={fullName}
                appointmentId={appointmentId}
                refreshData={refreshData}
              />
            ) : (
              <EndCall
                message="Has salido de la cita antes de finalizar el tiempo"
                buttonTitle="Volver a ingresar"
              />
            )
          ) : (
            <EndCall
              message="La cita aun no esta activa"
              url="/app/citas"
              buttonTitle="Volver a mis sesiones"
            />
          )
        ) : (
          <Container maxWidth="sm" sx={{ mt: 20 }} className="fadeIn">
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{ fontSize: { xs: 22, md: 32 }, fontWeight: 500 }}
            >
              La cita ha finalizado
            </Typography>
            {/* appointment.checkinTimePsychologist */true ? (
              <Calification appointmentId={appointmentId} />
            ) : (
              <PsychologistDidNotAttend appointmentId={appointmentId} />
            )}
          </Container>
        )}
      </Box>
    </PatientLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({
//   req,
//   query,
// }) => {
//   const { id = "" } = query;
//   const session: any = await getSession({ req });

//   if (session) {
//     if (session.user.role !== "patient") {
//       return {
//         redirect: {
//           destination: `/psicologo/home`,
//           permanent: false,
//         },
//       };
//     }
//   }

//   if (!session) {
//     return {
//       redirect: {
//         destination: `/autenticacion/login?p=/app/citas/${id}`,
//         permanent: false,
//       },
//     };
//   }

//   const appointment = await dbAppointment.getAppointmentById(id.toString());

//   if (!appointment) {
//     return {
//       redirect: {
//         destination: "/app/citas/historial",
//         permanent: false,
//       },
//     };
//   }

//   if (appointment.patient !== session.user._id) {
//     return {
//       redirect: {
//         destination: "/app/citas/historial",
//         permanent: false,
//       },
//     };
//   }

//   const fullName = `${session.user.firstName} ${session.user.lastName}`;
//   const appointmentId = appointment._id;

//   return {
//     props: {
//       appointment,
//       fullName,
//       appointmentId,
//     },
//   };
// };

export default MeetPage;
