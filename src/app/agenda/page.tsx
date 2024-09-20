"use client";
import Table from "@mui/material/Table/Table";
import TableBody from "@mui/material/TableBody/TableBody";
import TableCell from "@mui/material/TableCell/TableCell";
import TableContainer from "@mui/material/TableContainer/TableContainer";
import TableHead from "@mui/material/TableHead/TableHead";
import TableRow from "@mui/material/TableRow/TableRow";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import Stack from "@mui/material/Stack/Stack";
import { useCallback, useEffect, useState } from "react";
import { IDay } from "@/app/_interfaces/schedule/IDay";
import React from "react";
import List from "@mui/material/List/List";
import {
  Dialog,
  Divider,
  InputLabel,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  ThemeProvider,
  Typography,
} from "@mui/material";
import {
  AddBox,
  Circle,
  DisabledByDefault,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import Hour from "@/app/_utils/hour";
import { useSession } from "next-auth/react";
import { ISchedule } from "@/app/_interfaces/schedule/ISchedule";
import { PsychologistLayout } from "@/app/_components/layout/PsychologistLayout";
import { scheduleTheme } from "@/app/_themes/schedule-theme";
import { days, hours } from "@/app/_utils/constants";
import ModalStates from "@/app/_enums/PeriodModalStates";
import AddPeriodModal from "@/app/_components/schedule/AddPeriodModal";
import ScheduleTable from "@/app/_components/schedule/ScheduleTable";
import { SCHEDULES } from "@/app/_utils/endpoints";
import { toast } from "react-toastify";
import PageHeader from "../_components/PageHeader";
import { FontWeightValues } from "../_enums/FontWeightValues";

interface state {
  day: IDay["day"];
  open: boolean;
}
// console.log("Hours es: " + hours);

export default function ConfigureSchedulePage() {
  // function fetchSchedule() {
  //     console.log("voy a mandar: " + process.env.NEXT_PUBLIC_BASE_URL + SCHEDULES);
  //     fetch(`${process.env.NEXT_PUBLIC_BASE_URL + SCHEDULES}?psychologist=${session?.psychologist?._id}`).
  //     then((res) => res.json()).
  //     then((res) => {
  //         // console.log("Este es el resultado");
  //         // console.log(res.days);
  //         res;
  //         console.log("Me llegó algo");
  //         if (res?.days) setSchedule([...res.days]);
  //     })
  // }

  function updateSchedule() {
    toast.promise(
      fetch(process.env.NEXT_PUBLIC_BASE_URL + SCHEDULES, {
        method: "POST",
        body: JSON.stringify({
          psychologist: session?.psychologist?._id,
          schedule: schedule,
        }),
      }),
      {
        pending: "Guardando agenda...",
        success: "Agenda guardada con éxito",
        error: "Ha ocurrido un error, por favor inténtalo nuevamente",
      }
    );
  }

  console.log("Carga la página");
  let result: ISchedule | null | undefined;
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const fetchSchedule = useCallback(() => {
    console.log(
      "voy a mandar: " + process.env.NEXT_PUBLIC_BASE_URL + SCHEDULES
    );
    if (session) {
      setLoading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL + SCHEDULES}?psychologist=${
          session?.psychologist?._id
        }`
      )
        .then((res) => res.json())
        .then((res) => {
          // console.log("Este es el resultado");
          // console.log(res.days);
          res;
          console.log("Me llegó algo");
          if (res?.days) setSchedule([...res.days]);
          setLoading(false);
        });
    }
  }, [session]);
  useEffect(() => {
    fetchSchedule();
  }, [session, fetchSchedule]);
  // console.log("Result days es: " + result?.days);
  const [schedule, setSchedule] = React.useState<IDay[]>(
    // result?.days ? [...result.days] :
    days.map((day) => ({
      day: day,
      hours: new Array(24).fill(false),
    }))
  );
  const [modalOpen, setModalOpen] = useState(ModalStates.Closed);
  // console.log("el lunes es: " + JSON.stringify(schedule));
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <AddPeriodModal
        schedule={schedule}
        setSchedule={setSchedule}
        state={modalOpen}
        close={() => setModalOpen(ModalStates.Closed)}
      />
      <PageHeader header="Configurar agenda" />
      <Stack direction="row" overflow="hidden" marginBottom="30px">
        <List
          sx={{
            span: {
              color: "#666666",
              fontWeight: `${FontWeightValues.Semibold} !important`,
            },
          }}
        >
          <ListItem key="addPeriod">
            <ListItemButton onClick={() => setModalOpen(ModalStates.Add)}>
              <ListItemIcon>
                <AddBox color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Agregar periodo" />
            </ListItemButton>
          </ListItem>
          <ListItem key="removePeriod">
            <ListItemButton onClick={() => setModalOpen(ModalStates.Remove)}>
              <ListItemIcon>
                <DisabledByDefault color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Eliminar periodo" />
            </ListItemButton>
          </ListItem>
          <Divider />

          <ListItem>
            <ThemeProvider theme={scheduleTheme}>
              <ListItemIcon>
                <Circle color="primary" />
              </ListItemIcon>
            </ThemeProvider>
            <ListItemText primary="Disponible" />
          </ListItem>
          <ListItem>
            <ThemeProvider theme={scheduleTheme}>
              <ListItemIcon>
                <Circle color="secondary" />
              </ListItemIcon>
            </ThemeProvider>
            <ListItemText primary="No disponible" />
          </ListItem>

          <Divider />
          <ListItem onClick={updateSchedule}>
            <ListItemButton>
              <ListItemText
                primary="Guardar cambios"
                sx={{ textAlign: "center" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={fetchSchedule}>
              <ListItemText
                primary="Cancelar cambios"
                sx={{ textAlign: "center" }}
              />
            </ListItemButton>
          </ListItem>
        </List>

        {/* <Box id="box1" sx = {{ height: '100vh'}}>
        <Toolbar/>
        <Box id="box2"sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100vw'}}>
        <Box id="box3" sx={{width: '100vw'}}> */}
        {/* <Paper sx={{ width: '100%',  }}> */}
        <ScheduleTable schedule={schedule} loading={loading} />
        {/* </Box>
        </Box>
        </Box> */}
        {/* </Paper> */}
      </Stack>
    </Box>
  );
}
