
//import Navbar from "@/components/navbar/Navbar";
import PsiLayout from "@/components/layout/PsiLayout";
import Navbar from "../components/navbar/Navbar";
import Button from "@mui/material/Button/Button";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import { Hero } from "@/components/ui/Hero";
// import Button from "@mui/material";
export default function Home() {
  return(
        <PsiLayout title="estumente">
        <Hero></Hero>
        <Box sx={{ margin: "40px auto", padding: "0px 30px" }}>
        <Typography color="secondary" align="center" variant="h1" gutterBottom>
          Unidos para crecer
        </Typography>

        <Typography color="inherit" align="center" variant="h2" gutterBottom>
          Trabajamos con terapeutas especializados en su labor.
        </Typography>

        {/* {isLoading ? (
          <FullScreenLoading />
        ) : (
          <PsychologistSingleList psychologists={psychologists} />
        )} */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <NextLink href="/psicologos/" passHref>
            <Link> */}
              <Button color="secondary" size="large" className="hero-btn">
                Comienza aquí
              </Button>
            {/* </Link>
          </NextLink> */}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "auto",
          height: 300,
          backgroundColor: "#efefef",
          padding: "0px 30px",
        }}
      >
        <Typography align="center" variant="h1" gutterBottom>
          ¿Eres psicólogo clínico?
        </Typography>

        <Typography color="inherit" align="center" variant="h2" gutterBottom>
          Accede a nuestra plataforma a través del siguiente enlace.
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* <NextLink href="/psicologo/registro" passHref>
            <Link> */}
              <Button color="secondary" size="large" className="hero-btn">
                Únete aquí
              </Button>
            {/* </Link>
          </NextLink> */}
        </Box>
      </Box>
        </PsiLayout>
        
    
  )
}
