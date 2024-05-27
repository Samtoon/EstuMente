import { IPsychologist } from "@/app/_interfaces/IPsychologist";
import { NextPage } from "next";
import { useRouter } from "next/navigation";

import React, { useContext, useEffect, useState } from "react";
// import { getSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { NextPage, GetServerSideProps } from "next";
import PatientLayout from "@/app/_components/layout/PatientLayout";
import PsychologistDisplay from "@/app/_components/appointments/Display";
import ModalBox from "@/app/_components/appointments/ModalBox";
import { getPsychologistBySlug } from "@/app/_database/daos/psychologistDao";
import { serialize } from "@/app/_database/connection";
import Box from "@mui/material/Box/Box";
import AppointmentDatePicker from "@/app/_components/appointments/AppointmentDatePicker";
// import { PatientLayout } from "../../../../components/layout";
// import { IPsychologist, IService } from "../../../../interfaces";
// import { dbPsychologists, dbServices } from "../../../../database";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import { DatePicker, LocalizationProvider } from "@mui/lab";
// import { format } from "date-fns";
// import es from "date-fns/locale/es";
// import { useSchedule } from "../../../../hooks";
// import { ScreenLoading } from "../../../../components/ui";
// import { convertTime } from "../../../../utils/time";
// import { AuthContext } from "../../../../context";
// import { AppointmentContext } from "../../../../context/appointment/AppointmentContext";
// import { toast } from "react-toastify";
// import { formatCurrency } from "../../../../utils/currency";
// import { validateHours } from "../../../../utils/validations";

interface Props {
  //   psychologist: IPsychologist;
  //   services: IService[];
  params: { slug: string }
}

const ScheduleAppointmentPage = async ({ params }: { params: { slug: string } }) => {
  const psychologist = await getPsychologistBySlug(params.slug);
  return (
    <PatientLayout title="Agendar cita" pageDescription="Agendar cita">
      <Box sx={{ margin: "80px auto", padding: "0px 30px" }}>
        {psychologist && <PsychologistDisplay psychologist={serialize(psychologist)}/>}
        <ModalBox />
      </Box>
    </PatientLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({
//   req,
//   params,
// }) => {
//   const session: any = await getSession({ req });
//   const { slug = "" } = params as { slug: string };
//   const psychologist = await dbPsychologists.getPsychologistBySlug(slug);
//   const services = await dbServices.getAllServices();

//   if (!session) {
//     return {
//       redirect: {
//         destination: `/autenticacion/login?p=/app/citas/agendar/${slug}`,
//         permanent: false,
//       },
//     };
//   }

//   if (session) {
//     if (session.user.role !== "patient") {
//       return {
//         redirect: {
//           destination: `/`,
//           permanent: false,
//         },
//       };
//     }
//   }

//   if (!psychologist) {
//     return {
//       redirect: {
//         destination: "/psicologos",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       psychologist,
//       services,
//     },
//   };
// };

export default ScheduleAppointmentPage;
