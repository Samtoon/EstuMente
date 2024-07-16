"use client"
import { Box, Container, Typography } from "@mui/material";
import { Calification } from "../appointments/Calification";
import { PsychologistDidNotAttend } from "../appointments/PsychologistDidNotAttend";
import { EndCall } from "./EndCall";
import { IUpcomingAppointment } from "@/app/_interfaces/IUpcomingAppointment";
import { useEffect, useState } from "react";
import { Call } from "./Call";
import { useSession } from "next-auth/react";

export default function CallDisplay({ appointment, token } : { appointment: IUpcomingAppointment, token: string }) {
    const [room, setRoom] = useState(appointment.roomURL);
    const {data: session, update} = useSession();
    useEffect(() => {
        console.log("use Effect malvado");
        if (session?.appointmentPatientId !== appointment.patient) {
            update({appointmentPatientId: appointment.patient});
        }
    }, [session, appointment, update])
    return (
        <Box>
            {/* appointment.endTime >= Date.now() / 1000 */true ? (
          /* appointment.startTime <= Date.now() / 1000 */true ? (
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
                            message="Has salido de la cita antes de finalizar el tiempo"
                            buttonTitle="Volver a ingresar"
                            trigger={() => setRoom(appointment.roomURL)}
                        />
                    )
                ) : (
                    <EndCall
                        message="La cita aun no esta activa"
                        url="/app/citas"
                        buttonTitle="Volver a mis sesiones"
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
                    {/* appointment.checkinTimePsychologist */true ? (
                        <Calification appointmentId={appointment._id!} />
                    ) : (
                        <PsychologistDidNotAttend appointmentId={appointment._id!} />
                    )}
                </Container>
            )}
        </Box>
    );
}