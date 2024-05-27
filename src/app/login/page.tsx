'use client'
import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import NextLink from "next/link";
//import { signIn, getSession, getProviders } from "next-auth/react";
import { useRouter } from "next/router";
//import { GetServerSideProps } from "next";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
// import { useForm } from "react-hook-form";
import { AuthLayout } from "../_components/layout/AuthLayout";
// import { validations } from "../../utils";
import { toast } from "react-toastify";

// interface Props {
//   providers: any;
// }

type FormData = {
  email: string;
  password: string;
};

// const LoginPage: NextPage<Props> = ({ providers }) => {
const LoginPage: NextPage = () => {
  //const router = useRouter();
  //const { error } = router.query;

  /* const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>(); */

  const [showError, setShowError] = useState(false);

  const [loading, setLoading] = useState(false);

  /* useEffect(() => {
    if (error) {
      setLoading(false);
      toast.error("Correo o contraseña invalidos", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }, [error]); */

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    setLoading(true);

    //await signIn("credentials", { email, password });
  };

  function handleLogin(user: String) {
    
  }

  return (
    <AuthLayout title="Iniciar sesión">
      <Container component="main" maxWidth="xs">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="calc(100vh - 200px)"
        >
          <form /* onSubmit={handleSubmit(onLoginUser)} */ noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h1" component="h1">
                  Iniciar sesión
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="email"
                  label="Correo"
                  variant="outlined"
                  fullWidth
                  /* {...register("email", {
                    required: "Debes ingresar un correo",
                    validate: validations.isEmail,
                  })} */
                  /* error={!!errors.email}
                  helperText={errors.email?.message} */
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="password"
                  label="Contraseña"
                  variant="outlined"
                  fullWidth
                  /* {...register("password", {
                    required: "Debes ingresar una contraseña",
                    minLength: {
                      value: 6,
                      message: "Tu contraseña debe tener mínimo 6 caracteres",
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message} */
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  color="secondary"
                  size="large"
                  disabled={loading}
                  fullWidth
                >
                  {loading && (
                    <CircularProgress
                      size={30}
                      sx={{ position: "absolute" }}
                      color="secondary"
                    />
                  )}
                  Ingresar
                </Button>
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="end">
                {/* <NextLink
                  href={
                    router.query.p
                      ? `/autenticacion/registro?p=${router.query.p}`
                      : "/autenticacion/registro"
                  }
                  passHref
                > */}
                  <Link underline="always">¿No tienes una cuenta?</Link>
                {/* </NextLink> */}
              </Grid>
              {/* <Grid
                item
                xs={12}
                display="flex"
                flexDirection="column"
                justifyContent="end"
              >
                <Divider sx={{ width: "100%", mb: 2 }} />
                <div key="credentials"></div>
                {Object.values(providers).map((provider: any) => {
                  if (provider.id === "credentials")
                    return <div key="credentials"></div>;
                  return (
                    <Button
                      key={provider.id}
                      variant="outlined"
                      fullWidth
                      color="secondary"
                      sx={{ mb: 1 }}
                      onClick={() => signIn(provider.id)}
                    >
                      {provider.name}
                    </Button>
                  );
                })}
              </Grid> */}
            </Grid>
          </form>
        </Box>
      </Container>
    </AuthLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

/* export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  // const providers = await getProviders();
  // console.log(providers);

  const { p = "/" } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}; */

export default LoginPage;