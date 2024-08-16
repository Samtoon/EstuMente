import { Suspense } from "react";
import { NextPage } from "next";
// import { getSession } from "next-auth/react";
// import { Typography, Box } from "@mui/material";
// import { PsiLayout } from "../../components/layout/PsiLayout";
// import { PsychologistList } from "../../components/psychologists/PsychologistList";
// import { Search } from "../../components/psychologists";
// import { usePsychologist } from "../../hooks";
// import { FullScreenLoading } from "../../components/ui";

import PsiLayout from "@/app/_components/layout/PsiLayout";
import { Search } from "@/app/_components/psychologists/Search";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import { PsychologistList } from "@/app/_components/psychologists/PsychologistList";
import {
  getPsychologistsByTutor,
  getPsychologists,
} from "../_database/daos/psychologistDao";
import Roles from "../_enums/Roles";
import { getMyServerSession } from "../_utils/next-auth";

const SearchPage: NextPage = async () => {
  const session = await getMyServerSession();
  const psychologists =
    session?.user.role === Roles.Tutor
      ? await getPsychologistsByTutor(session.user._id!)
      : await getPsychologists();
  return (
    <PsiLayout title="PsicologicaMente" pageDescription="Sanando Juntos">
      <Box sx={{ margin: "80px auto", padding: "0px 30px" }}>
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{ fontSize: { xs: 22, md: 32 }, fontWeight: 500 }}
        >
          Elige un practicante
        </Typography>

        <Search onQueryChange="asdlfjasf" />
        <Suspense fallback="Cargando...">
          <PsychologistList psychologists={psychologists} />
        </Suspense>
      </Box>
    </PsiLayout>
  );
};

export default SearchPage;
