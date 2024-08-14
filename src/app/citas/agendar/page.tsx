"use client";

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

const ScheduleAppointmentPage: NextPage<Props> = (
  {
    //   psychologist,
    //   services,
  }
) => {
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
                  defaultValue={5} /* {psychologist.calification} */
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
              ></ToggleButtonGroup>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              display="flex"
              flexDirection="column"
              sx={{ alignItems: "center", justifyContent: "center" }}
              mb={2}
            >
              <Typography>Aquí va el Date Picker</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PatientLayout>
  );
};

export default ScheduleAppointmentPage;
