'use client'
import React, { FC, useState } from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import "date-fns";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { IUpcomingAppointment } from "@/interfaces/IUpcomingAppointment";
import { IPsychologist } from "@/interfaces/IPsychologist";
import { isAppointmentTime } from "@/utils/schedule";
import { useRouter } from "next/navigation";
import GoogleImage from "../ui/GoogleImage";
import { IPreviousAppointment } from "@/interfaces/IPreviousAppointment";

interface Props {
  appointment: IUpcomingAppointment | IPreviousAppointment,
  psychologist?: IPsychologist,
  fullName: string,
  image: string,
  role: string
}

export const AppointmentCard: FC<Props> = ({ appointment, psychologist, fullName, image, role }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const router = useRouter();

  return (
    <Grid item xs={12}>
      <Card
        sx={{ display: { xs: "", sm: "flex" }, p: 2 }}
        variant="outlined"
        className="fadeIn"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CardMedia
            component={GoogleImage}
            // image={image}
            // image={image}
            compAlt={fullName}
            compSrc={image}
            // onLoad={() => setIsImageLoaded(true)}
            compStyle={{ width: 120, height: 120, m: 1, borderRadius: "50%" }}
            // slotProps={{img: {referrerPolicy:"no-referrer"}}}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            {/* <Typography component="div" variant="subtitle1">
              {`${appointment.typeService} con`}
            </Typography> */}
            <Typography color="text.secondary" component="div" variant="h5">
              {`${role}: ${fullName}`}
            </Typography>

            <Typography variant="h6" color="text.secondary" component="div">
              {`Fecha: ${format(
                appointment.date,
                "EEEE dd",
                {
                  locale: es,
                }
              )} de ${format(
                appointment.date,
                "MMMM yyyy",
                {
                  locale: es,
                }
              )}`}
            </Typography>
            <Typography variant="h6" color="text.secondary" component="div">
              {`Hora de inicio: ${format(
                appointment.date,
                "HH:mm a"
              )}`}
            </Typography>
            {/* <NextLink href={`/app/citas/${appointment._id}`} passHref> */}
              <Link>
                <Typography
                  variant="body1"
                  color="secondary"
                  component="div"
                  gutterBottom
                >
                  Ver información de la cita
                </Typography>
              </Link>
            {/* </NextLink> */}
            {/* {!appointment.isPaid ? (
              <Chip
                label={`Pendiente de pago`}
                color="error"
                variant="outlined"
                size="small"
                icon={<CreditCardOffOutlined />}
              />
            ) : (
              <Chip
                label={appointment.state}
                color="success"
                variant="outlined"
                size="small"
              />
            )} */}
          </CardContent>
        </Box>
        <Box flex={1} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CardActions sx={{ width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              <Stack
                direction={{ xs: "column", sm: "column" }}
                spacing={1}
                justifyContent="center"
                alignItems="center"
              >
                {/* appointment.isPaid */ true ? (
                  // <NextLink
                  //   href={`/app/citas/meet/${appointment._id}`}
                  //   passHref
                  //   prefetch={false}
                  // >
                    <Button
                      size="small"
                      color="secondary"
                      fullWidth
                      disabled={
                        // appointment.startTime >= Date.now() / 1000 ||
                        // appointment.endTime <= Date.now() / 1000
                        !isAppointmentTime(appointment.date)
                      }
                      onClick={() => router.push(`/citas/meet/${appointment._id}`)}
                    >
                      {/* appointment.endTime <= Date.now() / 1000 */ false
                        ? "Videollamada finalizada"
                        : "Ingresar a mi cita"}
                    </Button>
                  // </NextLink>
                ) : (
                  <NextLink
                    href={`/app/citas/${appointment._id}`}
                    passHref
                    prefetch={false}
                  >
                    <Button size="small" color="secondary" fullWidth>
                      Pagar cita
                    </Button>
                  </NextLink>
                )}

                {/* {!appointment.isPaid && (
                  <CancelModal appointmentId={appointment._id} />
                )} */}

                {/* {appointment.checkinTimePsychologist &&
                  appointment.endTime <= Date.now() / 1000 &&
                  appointment.calification === 0 && (
                    <CalificationModal appointmentId={appointment._id} />
                  )} */}

                {/* {!appointment.checkinTimePsychologist &&
                  (appointment.endTime <= Date.now() / 1000 ||
                    Date.now() / 1000 <= appointment.startTime - 7200) &&
                  (appointment.state === "activa" ||
                    appointment.state === "psicólogo no asistió") && (
                    <NextLink
                      href={`/app/citas/reagendar/${appointment._id}`}
                      passHref
                      prefetch={false}
                    >
                      <Button size="small" color="secondary" fullWidth>
                        Reagendar cita
                      </Button>
                    </NextLink>
                  )} */}
              </Stack>
            </Box>
          </CardActions>
        </Box>
      </Card>
    </Grid>
  );
};
