import { NextPage } from "next";

import { Avatar, Box, Grid, Typography } from "@mui/material";
import { PsychologistLayout } from "@/app/_components/layout/PsychologistLayout";
import { getUserById } from "@/app/_database/daos/userDao";
import { getPreviousAppointmentsByPatientAndPsychologist } from "@/app/_database/daos/previousAppointmentDao";
import { SessionClinicHistoryList } from "@/app/_components/sessions/SessionClinicHistoryList";
import { getMyServerSession } from "@/app/_utils/next-auth";

// import { PsychologistLayout } from "../../../components/layout";

// import { IAppointment, IUser } from "../../../interfaces";
// import { dbAppointment, dbPatients } from "../../../database";
// import { SessionClinicHistoryList } from "../../../components/session/SessionClinicHistoryList";

interface Props {
  //   patient: IUser;
  //   appointments: IPreviousAppointment[];
  params: {
    id: string;
  };
}

const PatientInfoPage: NextPage<Props> = async ({ params }) => {
  const session = await getMyServerSession();
  const patient = await getUserById(params.id);
  const appointments = await getPreviousAppointmentsByPatientAndPsychologist(
    params.id,
    session?.psychologist?._id!
  );
  return (
    <PsychologistLayout
      title="Información del paciente"
      pageDescription={"Información del paciente"}
    >
      <Box sx={{ margin: "80px auto", padding: "0px 30px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Box
              display="flex"
              flexDirection="column"
              sx={{ alignItems: "center", justifyContent: "center" }}
            >
              <Avatar
                alt="Psychologist"
                src={patient.profilePicture}
                sx={{ width: 120, height: 120, mb: 2 }}
                slotProps={{ img: { referrerPolicy: "no-referrer" } }}
              />

              <Typography variant="h1" component="h1" align="center">
                {`${patient.firstName} ${patient.lastName}`}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box display="flex" flexDirection="column">
              <Typography
                variant="h2"
                component="h2"
                fontWeight={500}
                gutterBottom
              >
                Sesiones
              </Typography>
              <SessionClinicHistoryList appointments={appointments} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PsychologistLayout>
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
//         destination: `/autenticacion/login?p=/psicologo/pacientes/${id}`,
//         permanent: false,
//       },
//     };
//   }

//   const patient = await dbPatients.getPatientById(id.toString());
//   const appointments = await dbAppointment.getAppointmentsToClinicHistory(
//     session.user._id,
//     id.toString()
//   );

//   if (!patient) {
//     return {
//       redirect: {
//         destination: "/psicologo/pacientes",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       patient,
//       appointments,
//     },
//   };
// };

export default PatientInfoPage;
