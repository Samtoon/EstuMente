import { Grid } from "@mui/material";
import React, { FC } from "react";
import { AppointmentCard } from "./AppointmentCard";
import { IUpcomingAppointment } from "@/interfaces/IUpcomingAppointment";
import { getPsychologistById } from "@/database/daos/psychologistDao";
import { compareAsc } from "date-fns";
import { getMyServerSession } from "@/utils/next-auth";
import { getUserById } from "@/database/daos/userDao";
import { IPreviousAppointment } from "@/interfaces/IPreviousAppointment";

interface Props {
  appointments: IUpcomingAppointment[] | IPreviousAppointment[];
  history: boolean
}

export const AppointmentList: FC<Props> = async ({ appointments, history }) => {
  function helper(
    appointmentLeft: IUpcomingAppointment | IPreviousAppointment, 
    appointmentRight: IUpcomingAppointment | IPreviousAppointment
  ) {
    const a = new Date(appointmentLeft.date);
    const b = new Date(appointmentRight.date);
    return compareAsc(a, b)
  }
  const session = await getMyServerSession();

  appointments.sort(helper);
  return (
    <Grid container spacing={4}>
      {appointments.map(async (appointment) => {
          const psychologist = await getPsychologistById(appointment.psychologist)
          const user = await getUserById(appointment.patient);
          const role = session?.user.role;
          return (
            <AppointmentCard
              appointment={appointment}
              fullName={role === "Practicante" ? 
              `${user?.firstName} ${user?.lastName}` : 
              psychologist?.fullName!
            }
              image={role === "Practicante" ? 
              user?.profilePicture?.url! :
              psychologist?.profilePicture!
              }
              key={appointment._id}
              role={role === "Practicante" ? "Consultante" : "Practicante"}
            />
          );
        
      })}
    </Grid>
  );
};
