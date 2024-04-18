"use client"
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"
import { es } from "date-fns/locale/es";

export default function AppointmentDatePicker() {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                <DatePicker
                  disablePast
                  label="Selecciona una fecha"
                  // onChange={(newValue: any) => {
                  //   newValue && setDate(newValue);
                  //   setHour("");
                  //   setService("");
                  // }}
                  // renderInput={(params: any) => <TextField {...params} />}
                />
              </LocalizationProvider>
    )
}