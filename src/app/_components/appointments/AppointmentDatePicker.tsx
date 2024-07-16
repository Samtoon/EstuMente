"use client"
import { StaticDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"
import { es } from "date-fns/locale/es";
import { esES } from "@mui/x-date-pickers/locales";
import { ISchedule } from "@/app/_interfaces/schedule/ISchedule";
import { getAvailableHours, isDayAvailable } from "@/app/_utils/schedule";
import { IUpcomingAppointment } from "@/app/_interfaces/IUpcomingAppointment";
import { useReducer } from "react";
import React from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import Hour from "@/app/_utils/hour";
import { scheduleAppointment } from "@/app/_utils/server actions/appointment";
import { useSession } from "next-auth/react";
import { IPsychologist } from "@/app/_interfaces/IPsychologist";
import { sendNotification } from "@/app/_utils/server actions/notification";
import { ReceiverTypes } from "@/app/_enums/ReceiverTypes";

interface IState {
  date?: Date,
  availableHours?: boolean[],
  appointments: IUpcomingAppointment[]
}

interface IAction {
  type: "date" | "hour" | "reset"
  appointments?: IUpcomingAppointment[],
  schedule?: ISchedule
  body?: Date | number
}

function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case "date":
      (action.body as Date).setHours(0);
      console.log("La fecha es: " + action.body);
      const availableHours = getAvailableHours(action.body as Date, state.appointments!, action.schedule!);
      console.log("Las horas son:");
      console.log(availableHours);
      return {
        ...state,
        date: action.body as Date,
        availableHours: availableHours,
      }
    case "hour":
      state.date?.setHours(action.body as number);
      return {
        ...state,
      }
    default:
      return {
        ...state,
        availableHours: getAvailableHours(state.date!, action.appointments!, action.schedule!),
        appointments: action.appointments!
      }
  }
}

export default function AppointmentDatePicker({ appointments, schedule, psychologist }: 
  { appointments: IUpcomingAppointment[], schedule: ISchedule, psychologist: IPsychologist }) {
  // const [state, setState] = useState<IState>({});
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0)
  const [state, dispatcher] = useReducer(reducer, {
    date: currentDate,
    availableHours: getAvailableHours(currentDate, appointments, schedule),
    appointments: appointments
  })
  const { data: session } = useSession();
  // const router = useRouter();
  let hour: number;
  //const trueSchedule = processAvailability(schedule, appointments);
  function isDisabled(date: Date) {
    return !isDayAvailable(date, state.appointments, schedule);
  }

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={es}
      localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}
    >
      <StaticDatePicker
        disablePast
        views={['month', 'day']}
        orientation="landscape"
        shouldDisableDate={isDisabled}
        onChange={(newValue) => newValue && dispatcher({
          type: "date",
          schedule: schedule,
          body: newValue
        })}
      // label="Selecciona una fecha"
      // onChange={(newValue: any) => {
      //   newValue && setDate(newValue);
      //   setHour("");
      //   setService("");
      // }}
      // renderInput={(params: any) => <TextField {...params} />}
      />
      <Stack spacing={2} justifyContent={"flex-start"} sx={{ height: "100%" }}>
        <FormControl>
        <InputLabel id="hora-label">Hora:</InputLabel>
        <Select
          labelId="hora-label"
          id="hora"
          label="Hora"
          value={state.date?.getHours()}
          disabled={state.date ? false : true}
          onChange={(e) => dispatcher({
            type: "hour",
            schedule: schedule,
            body: e.target.value as number
          })}
        >
          {
            state.availableHours?.map((hour, index) =>
              hour && <MenuItem value={index} key={`opcion${index}`}>{new Hour(index).getString()}</MenuItem>
            )
          }
        </Select>
        </FormControl>
        <Button
          size="large"
          color="secondary"
          disabled={!state.availableHours![state.date?.getHours()!]}
          onClick={async () => {
            const user = session?.user!;
            console.log(`Mandando la fecha: ${state.date}`);
            appointments = await scheduleAppointment(user._id!, schedule.psychologist as string, state.date!);
            await sendNotification(
              {type: ReceiverTypes.User, id: user._id!},
              `Tienes una nueva cita con ${user.firstName} ${user.lastName}`,
              true,
              user.profilePicture?.url
            );
            dispatcher({ type: "reset", appointments: appointments, schedule: schedule });
          }}>
          Programar ahora
        </Button>
      </Stack>
    </LocalizationProvider>
  )
}