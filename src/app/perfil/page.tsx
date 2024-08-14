"use client";
import { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { Box, Container, Grid } from "@mui/material";
// import { PatientLayout } from "../../../components/layout";
import PatientLayout from "@/app/_components/layout/PatientLayout";
import IUser from "@/app/_interfaces/IUser";
import { UploadProfilePicture } from "@/app/_components/profile/UploadProfilePicture";
import { PersonalInfo } from "@/app/_components/profile/PersonalInfo";
import { hasPendingRequests } from "../_utils/server actions/request";
import { useEffect, useState } from "react";
// import { dbPatients } from "../../../database";
// import {
//   PersonalInfo,
//   UploadProfilePicture,
// } from "../../../components/profile";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [pendingRequests, setPendingRequests] = useState(true);
  useEffect(() => {
    if (session) {
      hasPendingRequests(session.user._id!).then((value) =>
        setPendingRequests(value)
      );
    }
  }, [session, setPendingRequests]);
  return (
    <PatientLayout
      title="Mi perfil"
      pageDescription={"Configuración de perfil"}
    >
      <Box sx={{ margin: "80px auto", padding: "0px 10px" }}>
        <Container component="main" maxWidth="sm">
          <UploadProfilePicture url={session?.user.profilePicture!} />
          <Grid container spacing={2}>
            <Grid item>
              <PersonalInfo
                user={session?.user!}
                pendingRequest={pendingRequests}
                setPendingRequest={setPendingRequests}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </PatientLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

/* export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req });

  if (session) {
    if (session.user.role !== "patient") {
      return {
        redirect: {
          destination: `/psicologo/home`,
          permanent: false,
        },
      };
    }
  }

  if (!session) {
    return {
      redirect: {
        destination: `/autenticacion/login?p=/app/perfil`,
        permanent: false,
      },
    };
  }

  const patient = await dbPatients.getPatientById(session.user._id);

  if (!patient) {
    return {
      redirect: {
        destination: "/app/home",
        permanent: false,
      },
    };
  }

  return {
    props: {
      patient,
    },
  };
};  */

export default ProfilePage;
