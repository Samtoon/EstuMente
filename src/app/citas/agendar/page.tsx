"use client"

import { IPsychologist } from "@/app/_interfaces/IPsychologist";
import { NextPage } from "next";
import { useRouter } from "next/navigation";

import React, { useContext, useEffect, useState } from "react";
// import { getSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { NextPage, GetServerSideProps } from "next";
import {
  Button,
  Grid,
  Typography,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  Avatar,
  Stack,
  Rating,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
} from "@mui/material";
import PatientLayout from "@/app/_components/layout/PatientLayout";
// import { PatientLayout } from "../../../../components/layout";
// import { IPsychologist, IService } from "../../../../interfaces";
// import { dbPsychologists, dbServices } from "../../../../database";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import { DatePicker, LocalizationProvider } from "@mui/lab";
// import { format } from "date-fns";
// import es from "date-fns/locale/es";
// import { useSchedule } from "../../../../hooks";
// import { ScreenLoading } from "../../../../components/ui";
// import { convertTime } from "../../../../utils/time";
// import { AuthContext } from "../../../../context";
// import { AppointmentContext } from "../../../../context/appointment/AppointmentContext";
// import { toast } from "react-toastify";
// import { formatCurrency } from "../../../../utils/currency";
// import { validateHours } from "../../../../utils/validations";

interface Props {
//   psychologist: IPsychologist;
//   services: IService[];
}

const ScheduleAppointmentPage: NextPage<Props> = ({
//   psychologist,
//   services,
}) => {
  const router = useRouter();
//   const { user, isLoggedIn } = useContext(AuthContext);
//   const { createAppointment } = useContext(AppointmentContext);
  const [open, setOpen] = React.useState(false);

  const [isPosting, setIsPosting] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [hour, setHour] = useState<any>("");
  const [service, setService] = useState<any>("");
  const [serviceSelected, setServiceSelected] = useState<any>([
    { cost: "", currency: "", duration: "", name: "" },
  ]);

  const [date, setDate] = useState<any>(new Date());

//   const { schedule, isLoading } = useSchedule(
//     `/schedule/get?psychologist=${psychologist._id}&day=${format(
//       date,
//       "dd/MM/yyyy"
//     )}`
//   );

  const [viewSchedule, setViewSchedule] = useState<string[]>([]);

//   useEffect(() => {
//     if (schedule) {
//       setViewSchedule(schedule.hours.sort());
//     }
//   }, [schedule]);

  const handleChangeHour = (
    event: React.MouseEvent<HTMLElement>,
    newHour: string | null
  ) => {
    setHour(newHour);
  };

  const handleChangeService = (
    event: React.MouseEvent<HTMLElement>,
    newService: string | null
  ) => {
    // setService(newService);
    // if (newService) {
    //   setServiceSelected(
    //     services.filter(function (element) {
    //       return element.name === newService;
    //     })
    //   );
    // }
  };

  const handleSave = async () => {
    // setIsPosting(true);
    // const startTime =
    //   new Date(`${format(date, "yyyy-MM-dd")} ${hour}`).getTime() / 1000 - 600;
    // const endTime = startTime + 3600;
    // const cost = serviceSelected[0].cost;
    // const duration = serviceSelected[0].duration;
    // const currency = serviceSelected[0].currency;
    // const notes: any = [];

    // const { hasError, message } = await createAppointment(
    //   user!._id,
    //   psychologist._id,
    //   service,
    //   duration,
    //   startTime,
    //   endTime,
    //   "solicitada",
    //   hour,
    //   format(date, "dd/MM/yyyy"),
    //   cost,
    //   currency,
    //   notes
    // );

    // if (hasError) {
    //   setIsPosting(false);
    //   toast.error(message, {
    //     position: toast.POSITION.BOTTOM_CENTER,
    //   });
    // } else {
    //   router.replace(`/app/citas/${message}`);
    // }
  };

  return (
    <PatientLayout title="Agendar cita" pageDescription="Agendar cita">
      <Box sx={{ margin: "80px auto", padding: "0px 30px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{
                padding: "10px",
                flexGrow: 1,
                backgroundColor: "secondary.main",
              }}
            >
              <Typography
                variant="h6"
                component="h6"
                align="center"
                color="white"
              >
                Pedir cita con
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                sx={{ alignItems: "center", justifyContent: "center" }}
              >
                <Avatar
                  alt="Psychologist"
                //   src={psychologist.user.profilePicture.url}
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
              </Box>
              <Typography
                variant="h1"
                component="h1"
                align="center"
                color="white"
              >
                {/* {psychologist.fullName} */}
                Un nombre X
              </Typography>
              <Stack spacing={1} alignItems="center" sx={{ m: 1 }}>
                <Rating
                  name="half-rating-read"
                  defaultValue={5}/* {psychologist.calification} */
                  precision={0.5}
                  readOnly
                />
              </Stack>
            </Paper>
          </Grid>

          <Grid item sm={12}>
            <Typography variant="h6" align="center">
              Selecciona un tipo de servicio
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              sx={{ alignItems: "center", justifyContent: "center" }}
              mt={2}
              mb={2}
            >
              <ToggleButtonGroup
                value={service}
                exclusive
                onChange={handleChangeService}
                color="secondary"
              >
                {/*services.map((service) => (
                  <ToggleButton value={service.name} key={service.name}>
                    {`${service.name}. ${service.duration} min ${formatCurrency(
                      service.cost
                    )} ${service.currency}`}
                  </ToggleButton>
                ))*/}
              </ToggleButtonGroup>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              display="flex"
              flexDirection="column"
              sx={{ alignItems: "center", justifyContent: "center" }}
              mb={2}
            >
              {/* <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
                <DatePicker
                  disablePast
                  label="Selecciona una fecha"
                  value={date}
                  onChange={(newValue: any) => {
                    newValue && setDate(newValue);
                    setHour("");
                    setService("");
                  }}
                  renderInput={(params: any) => <TextField {...params} />}
                />
              </LocalizationProvider> */}
              <Typography>
                Aquí va el Date Picker
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* {isLoading ? (
          <ScreenLoading />
        ) : (
          <Box
            sx={{
              m: { xs: "0", sm: "0 5rem", md: "0 10rem", lg: "0 20rem" },
            }}
          >
            {viewSchedule.length === 0 || !validateHours(viewSchedule, date) ? (
              <Typography variant="body1" align="center" gutterBottom>
                {"No hay horario disponible para la fecha seleccionada"}
              </Typography>
            ) : (
              <Grid container spacing={4}>
                <Grid
                  item
                  xs={4}
                  sm={4}
                  container
                  direction="column"
                  alignItems="stretch"
                >
                  <Typography variant="h6" align="center" gutterBottom>
                    Mañana
                  </Typography>
                  <ToggleButtonGroup
                    orientation="vertical"
                    size="small"
                    color="secondary"
                    value={hour}
                    exclusive
                    onChange={handleChangeHour}
                  >
                    {viewSchedule.map((h: string) => {
                      const dateActual = new Date();
                      let actualHour = `${dateActual.getHours()}:${dateActual.getMinutes()}`;
                      if (
                        h >= "07:00" &&
                        h <= "12:00" &&
                        (h > actualHour ||
                          date.getTime() / 1000 - 3600 >
                            dateActual.getTime() / 1000)
                      )
                        return (
                          <ToggleButton value={h} key={h}>
                            {convertTime(h)}
                          </ToggleButton>
                        );
                    })}
                  </ToggleButtonGroup>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sm={4}
                  container
                  direction="column"
                  alignItems="stretch"
                >
                  <Typography variant="h6" align="center" gutterBottom>
                    Tarde
                  </Typography>
                  <ToggleButtonGroup
                    orientation="vertical"
                    size="small"
                    color="secondary"
                    value={hour}
                    exclusive
                    onChange={handleChangeHour}
                  >
                    {viewSchedule.map((h: string) => {
                      const dateActual = new Date();
                      const actualHour = `${dateActual.getHours()}:${dateActual.getMinutes()}`;
                      if (
                        h >= "13:00" &&
                        h <= "18:00" &&
                        (h > actualHour ||
                          date.getTime() / 1000 - 3600 >
                            dateActual.getTime() / 1000)
                      )
                        return (
                          <ToggleButton value={h} key={h}>
                            {convertTime(h)}
                          </ToggleButton>
                        );
                    })}
                  </ToggleButtonGroup>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sm={4}
                  container
                  direction="column"
                  alignItems="stretch"
                >
                  <Typography variant="h6" align="center" gutterBottom>
                    Noche
                  </Typography>
                  <ToggleButtonGroup
                    orientation="vertical"
                    size="small"
                    color="secondary"
                    exclusive
                    value={hour}
                    onChange={handleChangeHour}
                  >
                    {viewSchedule.map((h: string) => {
                      const dateActual = new Date();
                      const actualHour = `${dateActual.getHours()}:${dateActual.getMinutes()}`;
                      if (
                        h >= "19:00" &&
                        h <= "23:00" &&
                        (h > actualHour ||
                          date.getTime() / 1000 - 3600 >
                            dateActual.getTime() / 1000)
                      )
                        return (
                          <ToggleButton value={h} key={h}>
                            {convertTime(h)}
                          </ToggleButton>
                        );
                    })}
                  </ToggleButtonGroup>
                </Grid>
              </Grid>
            )}
          </Box>
        )} */}

        <Box
          display={viewSchedule.length === 0 ? "none" : "flex"}
          flexDirection="column"
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <Button
            size="large"
            color="secondary"
            sx={{ mt: 3 }}
            disabled={
              service === "" ||
              hour === "" ||
              date === null ||
              service === null ||
              hour === null
            }
            onClick={handleClickOpen}
          >
            Siguiente
          </Button>
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Detalles de tu cita</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1" component="div">
                      Servicio:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      fontWeight={350}
                    >
                      {serviceSelected[0].name}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1" component="div">
                      Psicólogo:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      fontWeight={350}
                    >
                      {/* {psychologist.fullName} */}
                      Un nombre X
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1" component="div">
                      Fecha y hora:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      fontWeight={350}
                    >
                      {/* {hour &&
                        `${format(date, "EEEE dd", {
                          locale: es,
                        })} de ${format(date, "MMMM yyyy", {
                          locale: es,
                        })} - ${convertTime(hour)}`} */}
                        Aquí va alguna hora
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1" component="div">
                      Duración:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      fontWeight={350}
                    >
                      {`${serviceSelected[0].duration} min`}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1" component="div">
                      Monto a pagar:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      fontWeight={350}
                    >
                      {/* {`${formatCurrency(serviceSelected[0].cost)} ${
                        serviceSelected[0].currency
                      }`} */}
                      Aquí va el precio
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <DialogContentText>
            Al confirmar la cita estas aceptando los términos y condiciones de
            Psicologicamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isPosting}>
            Cancelar
          </Button>
          <Button color="secondary" onClick={handleSave} disabled={isPosting}>
            {isPosting && (
              <CircularProgress
                size={20}
                sx={{ position: "absolute" }}
                color="secondary"
              />
            )}
            Confirmar cita
          </Button>
        </DialogActions>
      </Dialog>
    </PatientLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({
//   req,
//   params,
// }) => {
//   const session: any = await getSession({ req });
//   const { slug = "" } = params as { slug: string };
//   const psychologist = await dbPsychologists.getPsychologistBySlug(slug);
//   const services = await dbServices.getAllServices();

//   if (!session) {
//     return {
//       redirect: {
//         destination: `/autenticacion/login?p=/app/citas/agendar/${slug}`,
//         permanent: false,
//       },
//     };
//   }

//   if (session) {
//     if (session.user.role !== "patient") {
//       return {
//         redirect: {
//           destination: `/`,
//           permanent: false,
//         },
//       };
//     }
//   }

//   if (!psychologist) {
//     return {
//       redirect: {
//         destination: "/psicologos",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       psychologist,
//       services,
//     },
//   };
// };

export default ScheduleAppointmentPage;
