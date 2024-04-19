import { Grid } from "@mui/material";
import React, { FC, Key } from "react";
import { IAppointment } from "@/interfaces/IAppointment";
import { AppointmentCard } from "./AppointmentCard";
import { IUpcomingAppointment } from "@/interfaces/IUpcomingAppointment";
import { getPsychologistById } from "@/database/daos/psychologistDao";
import { serialize } from "@/database/connection";
import { compareAsc } from "date-fns";

interface Props {
  appointments: IUpcomingAppointment[];
}

export const AppointmentList: FC<Props> = ({ appointments }) => {
  function helper(appointmentLeft: IUpcomingAppointment, appointmentRight: IUpcomingAppointment) {
    const a = new Date(appointmentLeft.date).setHours(appointmentLeft.hour);
    const b = new Date(appointmentRight.date).setHours(appointmentRight.hour);
    return compareAsc(a, b)
  }
  appointments.sort(helper);
  return (
    <Grid container spacing={4}>
      {appointments.map(async (appointment) => {
        
          return (
            <AppointmentCard
              appointment={appointment}
              psychologist={serialize(await getPsychologistById(appointment.psychologist))}
              key={appointment._id}
            />
          );
        
      })}
    </Grid>
  );
};
