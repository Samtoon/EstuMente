// import { Typography, Box } from "@mui/material";
// import { PatientLayout } from "../../../components/layout/PatientLayout";
import PatientLayout from "@/components/layout/PatientLayout";
// import { dbAppointment } from "../../../database";
import { AppointmentList } from "@/components/appointments/AppointmentList";
import { EmptyAppointment } from "@/components/appointments/EmptyAppointment";
// import { getAppointmentsByPatient } from "@/database/dbAppointments";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import { getUpcomingAppointmentsByPsychologist, getUpcomingAppointmentsByUser } from "@/database/daos/upcomingAppointmentDao";
import { getMyServerSession } from "@/utils/next-auth";
import { serialize } from "@/database/connection";

const AppointmentPage = async () => {
  // const session = await getServerSession(authOptions)
  // const appointments = await getAppointmentsByPatient(
  //   session?.user._id!
  // );
  const session = await getMyServerSession();
  const appointments = session?.user.role === "Practicante" ? 
  await getUpcomingAppointmentsByPsychologist(session?.psychologist?._id!) : 
  await getUpcomingAppointmentsByUser(session?.user._id!);
  console.log(`El tipo de las fechas es:${typeof appointments[0]}`)
  return (
    <PatientLayout title="Mis citas" pageDescription="Mis citas">
      <Box sx={{ margin: "80px auto", padding: "0px 30px" }}>
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{ fontSize: { xs: 22, md: 32 }, fontWeight: 500 }}
        >
          Mis citas
        </Typography>

        {appointments.length === 0 ? (
          <EmptyAppointment message={"No tienes citas activas"} />
        ) : (
          <AppointmentList appointments={serialize(appointments)} />
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

//   const appointments = await dbAppointment.getAppointmentsByPatient(
//     session.user._id
//   );

//   return {
//     props: {
//       appointments,
//     },
//   };
// };

export default AppointmentPage;
