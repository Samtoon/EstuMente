"use client"
import { DatePicker, StaticDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"
import { es } from "date-fns/locale/es";
import { esES } from "@mui/x-date-pickers/locales";
import { IAppointment } from "@/interfaces/IAppointment";
import { ISchedule } from "@/interfaces/schedule/ISchedule";
import { processAvailability } from "@/utils/schedule";
import { IUpcomingAppointment } from "@/interfaces/IUpcomingAppointment";

export default function AppointmentDatePicker({ appointments, schedule } : { appointments: IUpcomingAppointment[], schedule: ISchedule }) {

  //const trueSchedule = processAvailability(schedule, appointments);
  function isDayAvailable(date: Date) {
    
  }

  return (
    <LocalizationProvider 
    dateAdapter={AdapterDateFns} 
    adapterLocale={es}
    localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}
    >
      <StaticDatePicker
      disablePast
      views={['day', 'month']}
      orientation="landscape"
        // label="Selecciona una fecha"
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