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
  MenuItem,
} from "@mui/material";
//import { useForm } from "react-hook-form";
import IUser from "@/app/_interfaces/IUser";
//import { FormInputDropdown } from "../ui";
//import { psiApi } from "../../axios-api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
// import { pruebaServerAction } from "@/utils/actions";
//import { validations } from "../../utils";

// type FormData = {
//   firstName: string;
//   lastName: string;
//   phone: string;
//   gender: string;
//   email: string;
// };

interface Props {
  user: IUser;
}

export const PersonalInfo: FC<Props> = ({ user }) => {
  
  function ProfileField({
    type,
    label,
    defaultValue,
    disabled,
    children
  }: {
    type: string,
    label: string,
    defaultValue: string | undefined,
    disabled: boolean,
    children?: React.ReactNode
  }) {
    return (
      <Grid item xs={12}>
        <TextField
          type={type}
          label={label}
          name={label}
          defaultValue={defaultValue}
          disabled={disabled}
          fullWidth
          InputProps={{ readOnly: !updating }}
        >
          {children}
        </TextField>
      </Grid>
    )
  }
  const options = [
    {
      label: "Masculino",
      value: "Masculino",
    },
    {
      label: "Femenino",
      value: "Femenino",
    },
    {
      label: "Otro",
      value: "Otro",
    }
  ];

  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);


  console.log("El género de este usuario es: " + session?.user.gender);
  console.log("El número del usuario es: " + session?.user.phone);
  function handleSubmit(formData: FormData) {
    update({ phone: formData.get("Celular"), gender: formData.get("gender")});
  }
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

  // const onUpdateUser = async ({
  //   firstName,
  //   lastName,
  //   phone,
  //   gender,
  //   email,
  // }: FormData) => {
  //   setLoading(true);
  //   try {
  //     /* const { data } = await psiApi.put("/user/update-profile-info", {
  //       firstName,
  //       lastName,
  //       phone,
  //       gender,
  //       email,
  //     }); */
  //     // router.reload();
  //   } catch (error: any) {
  //     setLoading(false);
  //     if (error.response) {
  //       return toast.error(error.response.data.message, {
  //         position: toast.POSITION.BOTTOM_CENTER,
  //       });
  //     }
  //     toast.error(
  //       "No fue posible actualizar tu información, vuelve a intentarlo",
  //       {
  //         position: toast.POSITION.BOTTOM_CENTER,
  //       }
  //     );
  //   }
  // };

  return (
    // <form /* onSubmit={handleSubmit(onUpdateUser)} */ noValidate>
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

          {!updating && (
            <Button
              color="secondary"
              size="small"
              onClick={() => {
                setUpdating(true);
              }}
            >
              Editar
            </Button>
          )}

          {updating && (
            <Button
              size="small"
              onClick={() => {
                setUpdating(false);
                // reset();
              }}
            >
              Cancelar
            </Button>
          )}

          {updating && (
            <Button
              type="submit"
              color="secondary"
              size="small"
              disabled={loading}
              form="profileForm"
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
        {updating && (
          <Typography
            variant="h6"
            component="h6"
            sx={{ fontSize: { xs: 16, md: 15 }, color: "red" }}
          >
            IMPORTANTE: Solo puedes actualizar tu celular y/o tu género. Para actualizar el resto de información,
            debes hacerlo desde tu correo de Google
          </Typography>
        )}
      </Grid>
      <ProfileField
        type="text"
        label="Nombres"
        defaultValue={session?.user.firstName!}
        disabled={updating}
      />
      <ProfileField
        type="text"
        label="Apellidos"
        defaultValue={session?.user.lastName!}
        disabled={updating}
      />
      <Grid item xs={12}>
      <form id="profileForm" action={handleSubmit}>
        <Grid container spacing={2}>
          <ProfileField
            type="tel"
            label="Celular"
            defaultValue={session?.user.phone}
            disabled={false}
          />
          <Grid item xs={12}>
            <TextField
              select
              name="gender"
              label="Género"
              defaultValue={session?.user.gender ? session.user.gender : options[0].value}
              fullWidth
              InputProps={{ readOnly: !updating }}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {/* <Grid item xs={12}>
            <Button type="submit">Guardar</Button>
          </Grid> */}
        </Grid>
      </form>
      </Grid>
      
      <ProfileField
        type="email"
        label="Correo"
        defaultValue={session?.user.email}
        disabled={updating}
      />
      <ProfileField
        type="text"
        label="Rol"
        defaultValue={session?.user.role}
        disabled={updating}
      />
      
    </Grid>
    // </form>
  );
};
