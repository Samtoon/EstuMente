import type { NextPage } from "next";
//import { getSession } from "next-auth/react";
//import { GetServerSideProps } from "next";
import { PatientLayout } from "../../components/layout/PatientLayout";
import TestLayout from "@/components/layout/TestLayout";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";

interface Props {}

const HomePagePatient: NextPage = () => {
  return (
    <PatientLayout
      title="Bienvenid@ a PsicológicaMente"
      pageDescription="PsicológicaMente - Sanando Juntos"
    >
      <Box sx={{ margin: "80px auto", padding: "0px 30px" }}>
        <Typography
          variant="h1"
          component="h1"
          sx={{ fontSize: { xs: 22, md: 32 }, fontWeight: 500 }}
        >
          Bienvenido a PsicológicaMente
        </Typography>

        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{ fontSize: { xs: 20, md: 26 }, fontWeight: 300 }}
        >
          Sanando Juntos
        </Typography>
      </Box>
      <TestLayout title="consultante"/>
    </PatientLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

/* export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/autenticacion/login?p=/app/home",
        permanent: false,
      },
    };
  }

  if (session) {
    if (session.user.role !== "patient") {
      return {
        redirect: {
          destination: `/`,
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
}; */

/*export default function HomePageConsultante() {
  return(<TestLayout title="Consultante"/>)
}*/

export default HomePagePatient;
