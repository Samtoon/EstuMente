import { Grid } from "@mui/material";
import React, { FC } from "react";
import { IAppointment } from "@/interfaces/IAppointment";
import { AppointmentCard } from "./AppointmentCard";

interface Props {
  appointments: IAppointment[];
}

export const AppointmentList: FC<Props> = ({ appointments }) => {
  return (
    <Grid container spacing={4}>
      {appointments.map((appointment) => {
        if (
          appointment.state === "solicitada" ||
          appointment.state === "activa" ||
          appointment.state === "psicólogo no asistió"
        ) {
          return (
            <AppointmentCard
              appointment={appointment}
              psychologist={appointment.psychologist}
              key={appointment._id}
            />
          );
        }
      })}
    </Grid>
  );
};
