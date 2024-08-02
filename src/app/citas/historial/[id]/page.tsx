import { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import NextLink from "next/link";
import { getSession } from "next-auth/react";

import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Chip,
  Button,
  List,
} from "@mui/material";
import { IPreviousAppointment } from "@/app/_interfaces/IPreviousAppointment";
import { PsychologistLayout } from "@/app/_components/layout/PsychologistLayout";
import { serialize } from "@/app/_database/connection";
import { getPreviousAppointmentById } from "@/app/_database/daos/previousAppointmentDao";
import { CardPatientAppointment } from "@/app/_components/appointments/CardPatientAppointment";
import { getUserById } from "@/app/_database/daos/userDao";
import IUser from "@/app/_interfaces/IUser";
import { SessionSummary } from "@/app/_components/appointments/SessionSummary";
import { getNotesByAppointment } from "@/app/_database/daos/noteDao";
import { INote } from "@/app/_interfaces/INote";
import NotesCard from "@/app/_components/appointments/NotesCard";

// import { PsychologistLayout } from "../../../components/layout";

// import { IAppointment } from "../../../interfaces";
// import { dbAppointment } from "../../../database";
// import {
//   CardPatientAppointment,
//   SessionSummary,
// } from "../../../components/session";

// import { toast } from "react-toastify";
// import { psiApi } from "../../../axios-api";

export type OrderResponseBody = {
  id: string;
  status:
    | "COMPLETED"
    | "SAVED"
    | "APPROVED"
    | "VOIDED"
    | "PAYER_ACTION_REQUIRED";
};

export default async function AppointmentPage({
  params,
}: {
  params: { id: string };
}) {
  const appointment = serialize(
    await getPreviousAppointmentById(params.id)
  ) as IPreviousAppointment;
  const patient = serialize(await getUserById(appointment.patient)) as IUser;
  const notes = serialize(
    await getNotesByAppointment(appointment._id!)
  ) as INote[];
  return (
    <PsychologistLayout
      title="Resumen de la sesión"
      pageDescription={"Resumen de la sesión"}
    >
      <Box sx={{ margin: "80px auto", padding: "0px 30px" }}>
        <Grid container className="fadeIn" spacing={2}>
          <Grid item xs={12} sm={6}>
            <CardPatientAppointment patient={patient} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card className="summary-card">
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Typography variant="h2">Resumen </Typography>
                  <Box flex={1} />
                  <Chip
                    label={`Cita ${appointment.state}`}
                    variant="outlined"
                    color="success"
                  />
                </Box>

                <Divider sx={{ my: 1 }} />
                <SessionSummary
                  appointmentValues={{
                    typeService: "cualquier servicio",
                    date: appointment.date,
                    cost: 0,
                    duration: 10,
                  }}
                />
                <Divider sx={{ my: 1 }} />
                <NotesCard notes={notes} />
                {/* <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                  {appointment.isPaid && (
                    <NextLink
                      href={`/app/citas/meet/${appointment._id}`}
                      passHref
                      prefetch={false}
                    >
                      <Button
                        size="small"
                        color="secondary"
                        fullWidth
                        disabled={
                          appointment.startTime >= Date.now() / 1000 ||
                          appointment.endTime <= Date.now() / 1000
                        }
                      >
                        {appointment.endTime <= Date.now() / 1000
                          ? "Sesión finalizada"
                          : "Ingresar a la sesión"}
                      </Button>
                    </NextLink>
                  )}
                </Box> */}
              </CardContent>
            </Card>
          </Grid>
          {/* <Grid xs={12} sm={6}>
            <NotesCard notes={notes} />
          </Grid> */}
        </Grid>
      </Box>
    </PsychologistLayout>
  );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({
//   req,
//   query,
// }) => {
//   const { id = "" } = query;
//   const session: any = await getSession({ req });

//   if (session) {
//     if (session.user.role !== "psychologist") {
//       return {
//         redirect: {
//           destination: `/app/home`,
//           permanent: false,
//         },
//       };
//     }
//   }

//   if (!session) {
//     return {
//       redirect: {
//         destination: `/autenticacion/login?p=/psicologo/sesiones/${id}`,
//         permanent: false,
//       },
//     };
//   }

//   const appointment = await dbAppointment.getAppointmentToPsychologist(
//     id.toString()
//   );

//   if (!appointment) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   /*Buscar una mejor forma de validar esto*/
//   // if (appointment.psychologist._id !== session.user._id) {
//   //   return {
//   //     redirect: {
//   //       destination: "/",
//   //       permanent: false,
//   //     },
//   //   };
//   // }

//   return {
//     props: {
//       appointment,
//     },
//   };
// };
