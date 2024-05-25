import type { NextPage } from "next";
// import { getSession } from "next-auth/react";
// import { GetServerSideProps } from "next";
// import { PatientLayout } from "../../../components/layout/PatientLayout";
// import { dbAppointment } from "../../../database";
// import { IAppointment } from "../../../interfaces";
// import { AppointmentHistoryList } from "../../../components/appointment";
// import { EmptyAppointment } from "../../../components/ui";

import { IPreviousAppointment } from "@/interfaces/IPreviousAppointment";
import PatientLayout from "@/components/layout/PatientLayout";
import { EmptyAppointment } from "@/components/appointments/EmptyAppointment";
import { getMyServerSession } from "@/utils/next-auth";
import { getPreviousAppointmentsByPatient, getPreviousAppointmentsByPsychologist } from "@/database/daos/previousAppointmentDao";
import { AppointmentList } from "@/components/appointments/AppointmentList";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import { serialize } from "@/database/connection";

interface Props {
}

const HistoryAppointmentPage: NextPage<Props> = async () => {
    const session = await getMyServerSession();
    const appointments = session?.user.role === "Practicante" ? 
    await getPreviousAppointmentsByPsychologist(session?.psychologist?._id!) : 
    await getPreviousAppointmentsByPatient(session?.user._id!);
    console.log(`El tipo de las fechas es:${typeof appointments[0]}`)
  return (
    <PatientLayout
      title="Historial de citas"
      pageDescription="Historial de citas"
    >
      <Box sx={{ margin: "80px auto", padding: "0px 30px" }}>
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{ fontSize: { xs: 22, md: 32 }, fontWeight: 500 }}
        >
          Historial de citas
        </Typography>
        {/*Mejorar la validacion porque si hay citas pero no son del tipo para el historial*/}
        {appointments.length === 0 ? (
          <EmptyAppointment message={"Aún no tienes citas en tu historial"} />
        ) : (
          <AppointmentList appointments={serialize(appointments)} history={true} />
        )}
      </Box>
    </PatientLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const session: any = await getSession({ req });

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/autenticacion/login?p=/app/citas/historial",
//         permanent: false,
//       },
//     };
//   }

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

//   const appointments = await dbAppointment.getAppointmentsHistoryByPatient(
//     session.user._id
//   );

//   return {
//     props: {
//       appointments,
//     },
//   };
// };

export default HistoryAppointmentPage;
