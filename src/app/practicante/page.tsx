import type { NextPage } from "next";
//import { getSession } from "next-auth/react";
//import { GetServerSideProps } from "next";
//import { dbAppointment } from "../../../database";
//import { IAppointment } from "../../../interfaces";
import { PsychologistLayout } from "@/components/layout/PsychologistLayout";
import PsiLayout from "@/components/layout/PsiLayout";
import TestLayout from "@/components/layout/TestLayout";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";


interface Props {
  //appointments: IAppointment[];
}

const HomePagePsychologist: NextPage<Props> = ({ /*appointments*/ }) => {
  return (
    <PsychologistLayout
      title="Bienvenid@ a PsicológicaMente"
      pageDescription="PsicológicaMente - Sanando Juntos"
    >
      <Box sx={{ margin: "80px auto", padding: "0px 30px" }}>
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{ fontSize: { xs: 22, md: 32 }, fontWeight: 500 }}
        >
          Bienvenido a PsicológicaMente
        </Typography>
      </Box>
      <TestLayout title="Practicante"/>
    </PsychologistLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

/* export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/autenticacion/login?p=/psicologo/home",
        permanent: false,
      },
    };
  }

  if (session) {
    if (session.user.role !== "psychologist") {
      return {
        redirect: {
          destination: `/`,
          permanent: false,
        },
      };
    }
  }

  const appointments = await dbAppointment.getAppointmentsByPatient(
    session.user._id
  );

  return {
    props: {
      appointments,
    },
  };
}; */

/*function HomepageIntern() {
  return(<TestLayout title="Practicante"/>)
}*/

export default HomePagePsychologist;
