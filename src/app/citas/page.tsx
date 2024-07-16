// import { Typography, Box } from "@mui/material";
// import { PatientLayout } from "../../../components/layout/PatientLayout";
import PatientLayout from "@/app/_components/layout/PatientLayout";
// import { dbAppointment } from "../../../database";
import { AppointmentList } from "@/app/_components/appointments/AppointmentList";
import { EmptyAppointment } from "@/app/_components/appointments/EmptyAppointment";
// import { getAppointmentsByPatient } from "@/database/dbAppointments";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import { getUpcomingAppointmentsByPsychologist, getUpcomingAppointmentsByPatient } from "@/app/_database/daos/upcomingAppointmentDao";
import { getMyServerSession } from "@/app/_utils/next-auth";
import { serialize } from "@/app/_database/connection";
import Roles from "../_enums/Roles";
import PageHeader from "../_components/PageHeader";

const AppointmentPage = async () => {
  // const session = await getServerSession(authOptions)
  // const appointments = await getAppointmentsByPatient(
  //   session?.user._id!
  // );
  const session = await getMyServerSession();
  const appointments = session?.user.role === Roles.Practicante ? 
  await getUpcomingAppointmentsByPsychologist(session?.psychologist?._id!) : 
  await getUpcomingAppointmentsByPatient(session?.user._id!);
  console.log(`El tipo de las fechas es:${typeof appointments[0]}`)
  return (
    <PatientLayout title="Mis citas" pageDescription="Mis citas">
      <Box>
        <PageHeader header="Mis Citas"/>
        {appointments.length === 0 ? (
          <EmptyAppointment message={"No tienes citas activas"} />
        ) : (
          <AppointmentList appointments={serialize(appointments)} history={false} />
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
