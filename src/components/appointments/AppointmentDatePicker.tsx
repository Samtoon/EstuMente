"use client"
import { DatePicker, StaticDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"
import { es } from "date-fns/locale/es";
import { esES } from "@mui/x-date-pickers/locales";
import { IPreviousAppointment } from "@/interfaces/IPreviousAppointment";
import { ISchedule } from "@/interfaces/schedule/ISchedule";
import { getAvailableHours, isDayAvailable, processAvailability } from "@/utils/schedule";
import { IUpcomingAppointment } from "@/interfaces/IUpcomingAppointment";
import { useReducer, useState } from "react";
import React from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import Hour from "@/utils/hour";
import { scheduleAppointment } from "@/utils/actions";
import { useSession } from "next-auth/react";
import Router from "next/router";

interface IState {
  date?: Date,
  availableHours?: boolean[],
  hour?: number,
  appointments: IUpcomingAppointment[]
}

interface IAction {
  type: "date" | "hour" | "reset"
  appointments?: IUpcomingAppointment[],
  schedule?: ISchedule
  body?: Date | number
}

function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case "date":
      return {
        ...state,
        date: action.body as Date,
        availableHours: getAvailableHours(action.body as Date, state.appointments!, action.schedule!),
        hour: 0
      }
    case "hour":
      return {
        ...state,
        hour: action.body as number
      }
    default:
      return {
        ...state,
        availableHours: getAvailableHours(state.date!, action.appointments!, action.schedule!),
        appointments: action.appointments!
      }
  }
}

export default function AppointmentDatePicker({ appointments, schedule }: { appointments: IUpcomingAppointment[], schedule: ISchedule }) {
  // const [state, setState] = useState<IState>({});

  const [state, dispatcher] = useReducer(reducer, {
    date: undefined,
    availableHours: undefined,
    hour: 0,
    appointments: appointments
  })
  console.log("hay " + state.appointments.length + "appointments");
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
          value={state.hour ? state.hour : ''}
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
          disabled={state?.hour === undefined}
          onClick={async () => {
            appointments = await scheduleAppointment(session?.user._id!, schedule.psychologist as string, state.date!, state.hour!);
            dispatcher({ type: "reset", appointments: appointments, schedule: schedule });
          }}>
          Programar ahora
        </Button>
      </Stack>
    </LocalizationProvider>
  )
}