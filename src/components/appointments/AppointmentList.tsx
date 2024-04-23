import { Grid } from "@mui/material";
import React, { FC, Key } from "react";
import { IPreviousAppointment } from "@/interfaces/IPreviousAppointment";
import { AppointmentCard } from "./AppointmentCard";
import { IUpcomingAppointment } from "@/interfaces/IUpcomingAppointment";
import { getPsychologistById } from "@/database/daos/psychologistDao";
import { serialize } from "@/database/connection";
import { compareAsc } from "date-fns";
import { getMyServerSession } from "@/utils/next-auth";
import { getUserById } from "@/database/daos/userDao";

interface Props {
  appointments: IUpcomingAppointment[];
}

export const AppointmentList: FC<Props> = async ({ appointments }) => {
  function helper(appointmentLeft: IUpcomingAppointment, appointmentRight: IUpcomingAppointment) {
    const a = new Date(appointmentLeft.date).setHours(appointmentLeft.hour);
    const b = new Date(appointmentRight.date).setHours(appointmentRight.hour);
    return compareAsc(a, b)
  }
  const session = await getMyServerSession();

  appointments.sort(helper);
  return (
    <Grid container spacing={4}>
      {appointments.map(async (appointment) => {
          const psychologist = await getPsychologistById(appointment.psychologist)
          const user = await getUserById(appointment.user);
          const role = session?.user.role;
          return (
            <AppointmentCard
              appointment={appointment}
              fullName={role === "Practicante" ? 
              user?.firstName! + user?.lastName! : 
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
