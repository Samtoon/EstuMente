import React, { createContext, FC, useState } from "react";
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
import NextLink from "next/link";
import IUser from "@/app/_interfaces/IUser";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import RegisterModal from "../register/RegisterModal";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { es } from "date-fns/locale";
import { esES } from "@mui/x-date-pickers/locales";
import FieldForm from "./FieldForm";
import ProfileFieldContext from "@/app/_contexts/ProfileFieldContext";

interface Props {
  user: IUser;
  pendingRequest: boolean;
  setPendingRequest: (value: boolean) => void;
}

export const PersonalInfo: FC<Props> = ({
  user,
  pendingRequest,
  setPendingRequest,
}) => {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  console.log("El género de este usuario es: " + session?.user.gender);
  console.log("El número del usuario es: " + session?.user.phone);

  return (
    // <form /* onSubmit={handleSubmit(onUpdateUser)} */ noValidate>
    <ProfileFieldContext.Provider
      value={{ updating, pendingRequest, setPendingRequest, setModalOpen }}
    >
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
        </Grid>
        <FieldForm setUpdating={setUpdating} />
        <RegisterModal
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
        />
      </Grid>
    </ProfileFieldContext.Provider>

    // </form>
  );
};
