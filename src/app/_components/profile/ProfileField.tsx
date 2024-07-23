import ProfileFieldContext from "@/app/_contexts/ProfileFieldContext";
import { Grid, TextField, MenuItem, Button, Dialog } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { esES } from "@mui/x-date-pickers/locales";
import { es } from "date-fns/locale";
import {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  useContext,
  useEffect,
  useState,
} from "react";
import GenderDialog from "./GenderDialog";
import GenderField from "./GenderField";
import DateField from "./DateField";

export default function ProfileField({
  type,
  label,
  defaultValue,
  disabled,
  xs,
}: {
  type: HTMLInputTypeAttribute | "special";
  label: string;
  defaultValue?: any;
  disabled?: boolean;
  xs?: number;
}) {
  const { updating, pendingRequest, setModalOpen } =
    useContext(ProfileFieldContext);
  if (type === "special") {
    switch (label) {
      case "Género":
        return (
          <Grid item xs={12}>
            <GenderField readOnly={!updating} />
          </Grid>
        );
      case "Carrera":
        const options = ["Ingeniería de Sistemas", "Biología", "Psicología"];
        return (
          <Grid item xs={12}>
            <TextField
              select
              label={label}
              name={label}
              defaultValue={defaultValue || options[0]}
              disabled={disabled}
              fullWidth
              InputProps={{ readOnly: !updating }}
            >
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        );
      case "Fecha de Nacimiento":
        return (
          <Grid item xs={12}>
            <DateField readOnly={!updating} defaultDate={defaultValue} />
          </Grid>
        );
      case "Rol":
        return (
          <>
            <ProfileField
              type="text"
              label="Rol"
              defaultValue={defaultValue}
              disabled={updating}
              xs={8}
            />
            <Grid item xs={4}>
              <Button
                fullWidth
                color="secondary"
                sx={{ height: "100%" }}
                onClick={() => setModalOpen(true)}
                disabled={pendingRequest}
              >
                Solicitar cambio de rol
              </Button>
            </Grid>
          </>
        );
    }
  }
  return (
    <Grid item xs={xs || 12}>
      <TextField
        type={type}
        label={label}
        name={label}
        defaultValue={defaultValue}
        disabled={disabled}
        fullWidth
        InputProps={{ readOnly: !updating }}
        InputLabelProps={{ shrink: defaultValue }}
      />
    </Grid>
  );
}
