"use client";
import { Box, Container, Typography } from "@mui/material";
import { Calification } from "../appointments/Calification";
import { PsychologistDidNotAttend } from "../appointments/PsychologistDidNotAttend";
import { EndCall } from "./EndCall";
import { IUpcomingAppointment } from "@/app/_interfaces/IUpcomingAppointment";
import { useEffect, useState } from "react";
import { Call } from "./Call";
import { useSession } from "next-auth/react";
import { addHours, isWithinInterval } from "date-fns";

export default function CallDisplay({
  appointment,
  token,
}: {
  appointment: IUpcomingAppointment;
  token: string;
}) {
  const [room, setRoom] = useState(appointment.roomURL);
  const { data: session, update } = useSession();
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    console.log("use Effect malvado");
    if (session?.appointmentPatientId !== appointment.patient) {
      update({ appointmentPatientId: appointment.patient });
    }
  }, [session, appointment, update]);
  if (
    !leaving &&
    !isWithinInterval(new Date(), {
      start: new Date(appointment.date),
      end: addHours(new Date(appointment.date), 1),
    })
  ) {
    console.log("La condición se cumple");
    setLeaving(true);
  }

  return (
    <Box>
      {!leaving ? (
        room !== null ? (
          <Call
            room={room}
            setRoom={setRoom}
            appointmentId={appointment._id!}
            refreshData={null}
            token={token}
          />
        ) : (
          <EndCall
            joinTrigger={() => setRoom(appointment.roomURL)}
            leaveTrigger={() => setLeaving(true)}
          />
        )
      ) : (
        <Container maxWidth="sm" sx={{ mt: 20 }} className="fadeIn">
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{ fontSize: { xs: 22, md: 32 }, fontWeight: 500 }}
          >
            La cita ha finalizado
          </Typography>
          {
            /* appointment.checkinTimePsychologist */ true ? (
              <Calification appointmentId={appointment._id!} />
            ) : (
              <PsychologistDidNotAttend appointmentId={appointment._id!} />
            )
          }
        </Container>
      )}
    </Box>
  );
}