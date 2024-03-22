import React, { FC, useState } from "react";
// import { useRouter } from "next/router";
import {
  Grid,
  Box,
  Typography,
  Button,
  Stack,
  CircularProgress,
  TextField,
} from "@mui/material";
//import { useForm } from "react-hook-form";
import IUser from "@/interfaces/IUser";
//import { FormInputDropdown } from "../ui";
//import { psiApi } from "../../axios-api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
//import { validations } from "../../utils";

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  email: string;
};

interface Props {
  user: IUser;
}

export const PersonalInfo: FC<Props> = ({ user }) => {
  const options = [
    {
      label: "Hombre",
      value: "Hombre",
    },
    {
      label: "Mujer",
      value: "Mujer",
    },
  ];

  const router = useRouter();
  const {data: session, status} = useSession();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  /* const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      gender: user.gender,
      email: user.email,
    },
  }); */

  const onUpdateUser = async ({
    firstName,
    lastName,
    phone,
    gender,
    email,
  }: FormData) => {
    setLoading(true);
    try {
      /* const { data } = await psiApi.put("/user/update-profile-info", {
        firstName,
        lastName,
        phone,
        gender,
        email,
      }); */
      // router.reload();
    } catch (error: any) {
      setLoading(false);
      if (error.response) {
        return toast.error(error.response.data.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
      toast.error(
        "No fue posible actualizar tu información, vuelve a intentarlo",
        {
          position: toast.POSITION.BOTTOM_CENTER,
        }
      );
    }
  };

  return (
    <form /* onSubmit={handleSubmit(onUpdateUser)} */ noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <Typography
              variant="h6"
              component="h6"
              sx={{ fontSize: { xs: 16, md: 20 } }}
            >
              Información personal
            </Typography>
            <Box flex={1} />
            {!disabled && (
              <Button
                color="secondary"
                size="small"
                onClick={() => {
                  setDisabled(true);
                }}
              >
                Editar
              </Button>
            )}

            {disabled && (
              <Button
                size="small"
                onClick={() => {
                  setDisabled(false);
                  // reset();
                }}
              >
                Cancelar
              </Button>
            )}

            {disabled && (
              <Button
                type="submit"
                color="secondary"
                size="small"
                disabled={loading}
              >
                {loading && (
                  <CircularProgress
                    size={20}
                    sx={{ position: "absolute" }}
                    color="secondary"
                  />
                )}
                Guardar
              </Button>
            )}
          </Stack>
        </Grid>

        {/* <Grid item xs={12}>
          <TextField
            type="text"
            label="Nombres"
            variant="outlined"
            fullWidth
            disabled={!disabled}
             {...register("firstName", {
              required: "Debes ingresar un nombre",
              minLength: {
                value: 2,
                message: "Tu nombre debe tener al menos 2 letras",
              },
            })} 
            // error={!!errors.firstName}
            // helperText={errors.firstName?.message}
            InputLabelProps={{ shrink: true }}
          />
        </Grid> */}
        <Grid item xs={4}>
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: 16, md: 20 } }}
          >
            Nombre:
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: 16, md: 20 } }}
          >
            {session?.user.firstName}
          </Typography>
        </Grid>
        {/* <Grid item xs={12}>
          <TextField
            type="text"
            label="Apellidos"
            variant="outlined"
            fullWidth
            disabled={!disabled}
             {...register("lastName", {
              required: "Debes ingresar un apellido",
              minLength: {
                value: 2,
                message: "Tu apellido debe tener al menos 2 letras",
              },
            })} 
            // error={!!errors.lastName}
            // helperText={errors.lastName?.message}
            InputLabelProps={{ shrink: true }}
          />
        </Grid> */}
        <Grid item xs={4}>
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: 16, md: 20 } }}
          >
            Apellido:
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: 16, md: 20 } }}
          >
            {session?.user.lastName}
          </Typography>
        </Grid>
        {/* <Grid item xs={12}>
          <TextField
            type="number"
            label="Celular"
            variant="outlined"
            fullWidth
            disabled={!disabled}
             {...register("phone", {
              required: "Debes ingresar un numero de celular",
              minLength: {
                value: 10,
                message: "Tu celular debe tener al menos 10 números",
              },
            })} 
            // error={!!errors.phone}
            // helperText={errors.phone?.message}
            InputLabelProps={{ shrink: true }}
          />
        </Grid> */}
        <Grid item xs={4}>
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: 16, md: 20 } }}
          >
            Celular:
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: 16, md: 20 } }}
          >
            {session?.user.phone}
          </Typography>
        </Grid>

        {/* <Grid item xs={12}>
          { <FormInputDropdown
            disabled={disabled}
            name="gender"
            control={control}
            label="Género"
            options={options}
          /> }
        </Grid> */}
        <Grid item xs={4}>
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: 16, md: 20 } }}
          >
            Género:
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: 16, md: 20 } }}
          >
            {session?.user.gender}
          </Typography>
        </Grid>

        {/* <Grid item xs={12}>
          <TextField
            type="email"
            label="Correo"
            variant="outlined"
            fullWidth
            disabled={!disabled}
             {...register("email", {
              required: "Debes ingresar un correo",
              validate: validations.isEmail,
            })} 
            // error={!!errors.email}
            // helperText={errors.email?.message}
          />
        </Grid> */}
        <Grid item xs={4}>
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: 16, md: 20 } }}
          >
            Correo:
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: 16, md: 20 } }}
          >
            {session?.user.email}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: 16, md: 20 } }}
          >
            Rol:
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: 16, md: 20 } }}
          >
            {session?.user.role}
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
};
