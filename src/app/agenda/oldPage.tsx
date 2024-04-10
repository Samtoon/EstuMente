"use client"
import React, { useContext, useEffect, useState } from "react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
// import { getSession } from "next-auth/react";
import {
  Button,
  Grid,
  Typography,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  Switch,
  CircularProgress,
} from "@mui/material";
// import { PsychologistLayout } from "../../../components/layout";
import { PsychologistLayout } from "@/components/layout/PsychologistLayout";
import { EventAvailable } from "@mui/icons-material";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import { DatePicker, LocalizationProvider } from "@mui/lab";
// import { format } from "date-fns";
// import es from "date-fns/locale/es";
// import { useSchedule } from "../../../hooks";
// import { AuthContext } from "../../../context";
// import {
//   containsAll,
//   mergeArray,
//   removeArray,
// } from "../../../utils/validations";
// import { toast } from "react-toastify";
// import { psiApi } from "../../../axios-api";
// import { Circle, EventAvailable } from "@mui/icons-material";
// import { ScreenLoading } from "../../../components/ui";

const ConfigureSchedulePage: NextPage = () => {
  const morning = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00"];
  const afternoon = ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
  const night = ["19:00", "20:00", "21:00", "22:00", "23:00"];

  const [checkedMorning, setCheckedMorning] = useState(false);
  const [checkedAfternoon, setCheckedAfternoon] = useState(false);
  const [checkedNight, setCheckedNight] = useState(false);

  const {data: session, status} = useSession();
//   const { user, isLoggedIn } = useContext(AuthContext);
  const [date, setDate] = useState<Date | number>(new Date());
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  let id = "1";
//   if (isLoggedIn) {
//     id = user!._id;
//   }
  if (session) {
    id = session.user._id!;
  }

//   const { schedule, isLoading } = useSchedule(
//     `/schedule/get-configure?psychologist=${id}&day=${format(
//       date,
//       "dd/MM/yyyy"
//     )}`
//   );

  const [viewSchedule, setViewSchedule] = useState<string[]>([]);
  const [viewScheduledHours, setViewScheduledHours] = useState<string[]>([""]);

//   useEffect(() => {
//     if (schedule) {
//       setViewSchedule(schedule.hours);
//       if (schedule.scheduledHours !== undefined) {
//         setViewScheduledHours(schedule.scheduledHours);
//       }
//     }
//   }, [schedule]);

  const [hours, setHours] = useState(viewSchedule);
  const [hoursScheduled, setHoursScheduled] = useState(viewScheduledHours);

//   const handleChangeHours = (
//     event: React.MouseEvent<HTMLElement>,
//     newHours: string[]
//   ) => {
//     setHours(newHours);

//     containsAll(morning, newHours)
//       ? setCheckedMorning(true)
//       : setCheckedMorning(false);

//     containsAll(afternoon, newHours)
//       ? setCheckedAfternoon(true)
//       : setCheckedAfternoon(false);

//     containsAll(night, newHours)
//       ? setCheckedNight(true)
//       : setCheckedNight(false);
//   };

//   const handleViewHours = () => {
//     setHours(viewSchedule);
//     setHoursScheduled(viewScheduledHours);
//     setDisabled(false);

//     containsAll(morning, viewSchedule)
//       ? setCheckedMorning(true)
//       : setCheckedMorning(false);

//     containsAll(afternoon, viewSchedule)
//       ? setCheckedAfternoon(true)
//       : setCheckedAfternoon(false);

//     containsAll(night, viewSchedule)
//       ? setCheckedNight(true)
//       : setCheckedNight(false);
//   };

//   const handleSave = async () => {
//     const psychologist = user!._id;
//     const day = format(date, "dd/MM/yyyy");
//     const newSchedule = hours;

//     try {
//       setLoading(true);
//       await psiApi.post("/schedule", { psychologist, day, hours });
//       setLoading(false);
//       toast.success("Agenda configurada con éxito", {
//         position: toast.POSITION.BOTTOM_CENTER,
//       });
//       setViewSchedule(newSchedule);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//       toast.error("No fue posible crear la agenda", {
//         position: toast.POSITION.BOTTOM_CENTER,
//       });
//     }
//   };

//   const handleEdit = async () => {
//     setDisabled(true);
//     const psychologist = user!._id;
//     const day = format(date, "dd/MM/yyyy");
//     const newSchedule = hours;

//     try {
//       setLoading(true);
//       await psiApi.put("/schedule", { psychologist, day, hours });
//       setLoading(false);
//       setDisabled(false);
//       toast.success("Agenda actualizada con éxito", {
//         position: toast.POSITION.BOTTOM_CENTER,
//       });
//       setViewSchedule(newSchedule);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//       setDisabled(false);
//       toast.error("No fue posible actualizar la agenda", {
//         position: toast.POSITION.BOTTOM_CENTER,
//       });
//     }
//   };

//   const handleCheckedMorning = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setCheckedMorning(event.target.checked);
//     if (!checkedMorning) {
//       const newHours = mergeArray(morning, hours);
//       setHours(removeArray(newHours, hoursScheduled));
//     } else {
//       const arrayFlitered = removeArray(hours, morning);
//       setHours(arrayFlitered);
//     }
//   };

//   const handleCheckedAfternoon = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setCheckedAfternoon(event.target.checked);
//     if (!checkedAfternoon) {
//       const newHours = mergeArray(afternoon, hours);
//       setHours(removeArray(newHours, hoursScheduled));
//     } else {
//       const arrayFlitered = removeArray(hours, afternoon);
//       setHours(arrayFlitered);
//     }
//   };

//   const handleCheckedNight = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setCheckedNight(event.target.checked);
//     if (!checkedNight) {
//       const newHours = mergeArray(night, hours);
//       setHours(removeArray(newHours, hoursScheduled));
//     } else {
//       const arrayFlitered = removeArray(hours, night);
//       setHours(arrayFlitered);
//     }
//   };

  return (
    <PsychologistLayout
      title="Configurar agenda"
      pageDescription="Configuración de agenda"
    >
      <Box sx={{ margin: "80px auto", padding: "0px 30px" }}>
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
          mt={3}
          mb={3}
        >
          {/* <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
              <DatePicker
                disablePast
                label="Selecciona una fecha"
                value={date}
                onChange={(newValue: any) => {
                  newValue && setDate(newValue);
                  setHours([]);
                  setHoursScheduled([""]);

                  setDisabled(true);
                  setCheckedMorning(false);
                  setCheckedAfternoon(false);
                  setCheckedNight(false);
                }}
                renderInput={(params: any) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid> */}
          <Grid item>
            <Button
              size="large"
              color="secondary"
              // onClick={handleViewHours}
              sx={{ display: viewSchedule.length === 0 ? "none" : "" }}
            >
              Ver y editar horas
            </Button>
          </Grid>
        </Grid>
        {/* {isLoading ? (
          <ScreenLoading />
        ) : ( */}
          <Box
            sx={{ m: { xs: "0", sm: "0 5rem", md: "0 10rem", lg: "0 20rem" } }}
          >
            <Grid container spacing={3}>
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
                <Switch
                  color="secondary"
                  checked={checkedMorning}
                  // onChange={handleCheckedMorning}
                  inputProps={{ "aria-label": "controlled" }}
                  disabled={viewSchedule.length === 0 ? false : disabled}
                />

                <ToggleButtonGroup
                  orientation="vertical"
                  size="small"
                  color="secondary"
                  value={hours}
                  // onChange={handleChangeHours}
                  disabled={viewSchedule.length === 0 ? false : disabled}
                >
                  <ToggleButton
                    value={"07:00"}
                    disabled={
                      hoursScheduled.indexOf("07:00") === -1 ? false : true
                    }
                  >
                    <EventAvailable
                      color="secondary"
                      sx={{
                        display:
                          hoursScheduled.indexOf("07:00") === -1
                            ? "none"
                            : "flex",
                        mr: 0.2,
                        fontSize: 18,
                      }}
                    />
                    7:00 am
                  </ToggleButton>

                  <ToggleButton
                    value={"08:00"}
                    disabled={
                      hoursScheduled.indexOf("08:00") === -1 ? false : true
                    }
                  >
                    <EventAvailable
                      color="secondary"
                      sx={{
                        display:
                          hoursScheduled.indexOf("08:00") === -1
                            ? "none"
                            : "flex",
                        mr: 0.2,
                        fontSize: 18,
                      }}
                    />
                    8:00 am
                  </ToggleButton>
                  <ToggleButton
                    value={"09:00"}
                    disabled={
                      hoursScheduled.indexOf("09:00") === -1 ? false : true
                    }
                  >
                    <EventAvailable
                      color="secondary"
                      sx={{
                        display:
                          hoursScheduled.indexOf("09:00") === -1
                            ? "none"
                            : "flex",
                        mr: 0.2,
                        fontSize: 18,
                      }}
                    />
                    9:00 am
                  </ToggleButton>
                  <ToggleButton
                    value={"10:00"}
                    disabled={
                      hoursScheduled.indexOf("10:00") === -1 ? false : true
                    }
                  >
                    <EventAvailable
                      color="secondary"
                      sx={{
                        display:
                          hoursScheduled.indexOf("10:00") === -1
                            ? "none"
                            : "flex",
                        mr: 0.2,
                        fontSize: 18,
                      }}
                    />
                    10:00 am
                  </ToggleButton>
                  <ToggleButton
                    value={"11:00"}
                    disabled={
                      hoursScheduled.indexOf("11:00") === -1 ? false : true
                    }
                  >
                    <EventAvailable
                      color="secondary"
                      sx={{
                        display:
                          hoursScheduled.indexOf("11:00") === -1
                            ? "none"
                            : "flex",
                        mr: 0.2,
                        fontSize: 18,
                      }}
                    />
                    11:00 am
                  </ToggleButton>
                  <ToggleButton
                    value={"12:00"}
                    disabled={
                      hoursScheduled.indexOf("12:00") === -1 ? false : true
                    }
                  >
                    <EventAvailable
                      color="secondary"
                      sx={{
                        display:
                          hoursScheduled.indexOf("12:00") === -1
                            ? "none"
                            : "flex",
                        mr: 0.2,
                        fontSize: 18,
                      }}
                    />
                    12:00 m
                  </ToggleButton>
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
                <Switch
                  color="secondary"
                  checked={checkedAfternoon}
                  // onChange={handleCheckedAfternoon}
                  inputProps={{ "aria-label": "controlled" }}
                  disabled={viewSchedule.length === 0 ? false : disabled}
                />
                <ToggleButtonGroup
                  orientation="vertical"
                  size="small"
                  color="secondary"
                  value={hours}
                  // onChange={handleChangeHours}
                  disabled={viewSchedule.length === 0 ? false : disabled}
                >
                  <ToggleButton
                    value={"13:00"}
                    disabled={
                      hoursScheduled.indexOf("13:00") === -1 ? false : true
                    }
                  >
                    <EventAvailable
                      color="secondary"
                      sx={{
                        display:
                          hoursScheduled.indexOf("13:00") === -1
                            ? "none"
                            : "flex",
                        mr: 0.2,
                        fontSize: 18,
                      }}
                    />
                    1:00 pm
                  </ToggleButton>
                  <ToggleButton
                    value={"14:00"}
                    disabled={
                      hoursScheduled.indexOf("14:00") === -1 ? false : true
                    }
                  >
                    <EventAvailable
                      color="secondary"
                      sx={{
                        display:
                          hoursScheduled.indexOf("14:00") === -1
                            ? "none"
                            : "flex",
                        mr: 0.2,
                        fontSize: 18,
                      }}
                    />
                    2:00 pm
                  </ToggleButton>
                  <ToggleButton
                    value={"15:00"}
                    disabled={
                      hoursScheduled.indexOf("15:00") === -1 ? false : true
                    }
                  >
                    <EventAvailable
                      color="secondary"
                      sx={{
                        display:
                          hoursScheduled.indexOf("15:00") === -1
                            ? "none"
                            : "flex",
                        mr: 0.2,
                        fontSize: 18,
                      }}
                    />
                    3:00 pm
                  </ToggleButton>
                  <ToggleButton
                    value={"16:00"}
                    disabled={
                      hoursScheduled.indexOf("16:00") === -1 ? false : true
                    }
                  >
                    <EventAvailable
                      color="secondary"
                      sx={{
                        display:
                          hoursScheduled.indexOf("16:00") === -1
                            ? "none"
                            : "flex",
                        mr: 0.2,
                        fontSize: 18,
                      }}
                    />
                    4:00 pm
                  </ToggleButton>
                  <ToggleButton
                    value={"17:00"}
                    disabled={
                      hoursScheduled.indexOf("17:00") === -1 ? false : true
                    }
                  >
                    <EventAvailable
                      color="secondary"
                      sx={{
                        display:
                          hoursScheduled.indexOf("17:00") === -1
                            ? "none"
                            : "flex",
                        mr: 0.2,
                        fontSize: 18,
                      }}
                    />
                    5:00 pm
                  </ToggleButton>
                  <ToggleButton
                    value={"18:00"}
                    disabled={
                      hoursScheduled.indexOf("18:00") === -1 ? false : true
                    }
                  >
                    <EventAvailable
                      color="secondary"
                      sx={{
                        display:
                          hoursScheduled.indexOf("18:00") === -1
                            ? "none"
                            : "flex",
                        mr: 0.2,
                        fontSize: 18,
                      }}
                    />
                    6:00 pm
                  </ToggleButton>
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
                <Switch
                  color="secondary"
                  checked={checkedNight}
                  // onChange={handleCheckedNight}
                  inputProps={{ "aria-label": "controlled" }}
                  disabled={viewSchedule.length === 0 ? false : disabled}
                />
                <ToggleButtonGroup
                  orientation="vertical"
                  size="small"
                  color="secondary"
                  value={hours}
                  // onChange={handleChangeHours}
                  disabled={viewSchedule.length === 0 ? false : disabled}
                >
                  <ToggleButton
                    value={"19:00"}
                    disabled={
                      hoursScheduled.indexOf("19:00") === -1 ? false : true
                    }
                  >
                    <EventAvailable
                      color="secondary"
                      sx={{
                        display:
                          hoursScheduled.indexOf("19:00") === -1
                            ? "none"
                            : "flex",
                        mr: 0.2,
                        fontSize: 18,
                      }}
                    />
                    7:00 pm
                  </ToggleButton>
                  <ToggleButton
                    value={"20:00"}
                    disabled={
                      hoursScheduled.indexOf("20:00") === -1 ? false : true
                    }
                  >
                    <EventAvailable
                      color="secondary"
                      sx={{
                        display:
                          hoursScheduled.indexOf("20:00") === -1
                            ? "none"
                            : "flex",
                        mr: 0.2,
                        fontSize: 18,
                      }}
                    />
                    8:00 pm
                  </ToggleButton>
                  <ToggleButton
                    value={"21:00"}
                    disabled={
                      hoursScheduled.indexOf("21:00") === -1 ? false : true
                    }
                  >
                    <EventAvailable
                      color="secondary"
                      sx={{
                        display:
                          hoursScheduled.indexOf("21:00") === -1
                            ? "none"
                            : "flex",
                        mr: 0.2,
                        fontSize: 18,
                      }}
                    />
                    9:00 pm
                  </ToggleButton>
                  <ToggleButton
                    value={"22:00"}
                    disabled={
                      hoursScheduled.indexOf("22:00") === -1 ? false : true
                    }
                  >
                    <EventAvailable
                      color="secondary"
                      sx={{
                        display:
                          hoursScheduled.indexOf("22:00") === -1
                            ? "none"
                            : "flex",
                        mr: 0.2,
                        fontSize: 18,
                      }}
                    />
                    10:00 pm
                  </ToggleButton>
                  <ToggleButton
                    value={"23:00"}
                    disabled={
                      hoursScheduled.indexOf("23:00") === -1 ? false : true
                    }
                  >
                    <EventAvailable
                      color="secondary"
                      sx={{
                        display:
                          hoursScheduled.indexOf("23:00") === -1
                            ? "none"
                            : "flex",
                        mr: 0.2,
                        fontSize: 18,
                      }}
                    />
                    11:00 pm
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>

            <Box
              display="flex"
              flexDirection="column"
              sx={{ alignItems: "center", justifyContent: "center" }}
            >
              {viewSchedule.length === 0 ? (
                <Button
                  size="large"
                  color="secondary"
                  sx={{ mt: 3 }}
                  // onClick={handleSave}
                  disabled={loading}
                >
                  {loading && (
                    <CircularProgress
                      size={30}
                      sx={{ position: "absolute" }}
                      color="secondary"
                    />
                  )}
                  Guardar
                </Button>
              ) : (
                <Button
                  size="large"
                  color="secondary"
                  sx={{ mt: 3 }}
                  disabled={disabled}
                  // onClick={handleEdit}
                >
                  {loading && (
                    <CircularProgress
                      size={30}
                      sx={{ position: "absolute" }}
                      color="secondary"
                    />
                  )}
                  Editar
                </Button>
              )}
            </Box>
          </Box>
        {/* )} */}
      </Box>
    </PsychologistLayout>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const session: any = await getSession({ req });

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/autenticacion/login?p=/psicologo/agenda/configurar",
//         permanent: false,
//       },
//     };
//   }

//   if (session) {
//     if (session.user.role !== "psychologist") {
//       return {
//         redirect: {
//           destination: `/`,
//           permanent: false,
//         },
//       };
//     }
//   }

//   return {
//     props: {},
//   };
// };

export default ConfigureSchedulePage;
