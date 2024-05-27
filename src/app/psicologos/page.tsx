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
import { fetchPsychologists } from "@/app/_database/connection";
import { IPsychologist } from "@/app/_interfaces/IPsychologist";
import { PsychologistList } from "@/app/_components/psychologists/PsychologistList";

const SearchPage: NextPage = () => {
  // const [query, setQuery] = useState("");
  // const [psychologists, setPsychologists] = useState<IPsychologist[]>([]);
  
  // useEffect(() => {
  //   async function recurrente() {
  //     console.log("Hola mundo");
  //     // const psychologists = await fetchPsychologists();
  //     // setPsychologists(psychologists);
  //   }
  //   recurrente();
  // });
  // const { psychologists, isLoading } = usePsychologist(
  //   `/psychologists/search?search=${query}`
  // );

  return (
    <PsiLayout title="PsicologicaMente" pageDescription="Sanando Juntos">
      <Box sx={{ margin: "80px auto", padding: "0px 30px" }}>
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{ fontSize: { xs: 22, md: 32 }, fontWeight: 500 }}
        >
          Elige a tu psicólogo
        </Typography>

        <Search onQueryChange="asdlfjasf" />

        {/* {isLoading ? (
          <FullScreenLoading />
        ) : (
          <PsychologistList psychologists={psychologists} />
        )} */}
        <Suspense fallback="Cargando...">
        <PsychologistList/>
        </Suspense>
        
      </Box>
    </PsiLayout>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const session: any = await getSession({ req });

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

//   return {
//     props: {},
//   };
// };

export default SearchPage;
