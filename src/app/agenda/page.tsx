"use client"
import Table from "@mui/material/Table/Table";
import TableBody from "@mui/material/TableBody/TableBody";
import TableCell from "@mui/material/TableCell/TableCell";
import TableContainer from "@mui/material/TableContainer/TableContainer";
import TableHead from "@mui/material/TableHead/TableHead";
import TableRow from "@mui/material/TableRow/TableRow";
import Paper from '@mui/material/Paper';
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import Stack from "@mui/material/Stack/Stack";
import { useCallback, useEffect, useState } from "react";
import { IDay } from "@/interfaces/schedule/IDay";
import React from "react";
import List from "@mui/material/List/List";
import { Dialog, Divider, InputLabel, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Modal, Select, ThemeProvider, Typography } from "@mui/material";
import { AddBox, Circle, DisabledByDefault, ExpandLess, ExpandMore } from "@mui/icons-material";
import Hour from "@/utils/hour";
import { useSession } from "next-auth/react";
import { ISchedule } from "@/interfaces/schedule/ISchedule";
import { PsychologistLayout } from "@/components/layout/PsychologistLayout";
import { scheduleTheme } from "@/themes/schedule-theme";
import { days, hours } from "@/utils/constants";
import ModalStates from "@/enums/PeriodModalStates";
import AddPeriodModal from "@/components/schedule/AddPeriodModal";
import ScheduleTable from "@/components/schedule/ScheduleTable";
import { SCHEDULES } from "@/utils/endpoints";

interface state {
    day: IDay["day"],
    open: boolean
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
        fetch(process.env.NEXT_PUBLIC_BASE_URL + SCHEDULES, {
            method: "POST",
            body: JSON.stringify({
                psychologist: session?.psychologist?._id,
                schedule: schedule
            })
        }).
        then(() => {console.log("Guardado con éxito")});
    }

    console.log("Carga la página");
    let result: ISchedule | null | undefined;
    const {data: session} = useSession();
    // fetch(`http://localhost:3000/api/ejemplo?email=${session?.user.email}`).
    //     then((res) => res.json()).
    //     then((res) => {
    //         console.log("Este es el resultado");
    //         console.log(res.days);
    //         result = res;
    //         //if (result?.days) setSchedule(result.days);
    //     })
    const fetchSchedule = useCallback(() => {
        console.log("voy a mandar: " + process.env.NEXT_PUBLIC_BASE_URL + SCHEDULES);
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL + SCHEDULES}?psychologist=${session?.psychologist?._id}`).
        then((res) => res.json()).
        then((res) => {
            // console.log("Este es el resultado");
            // console.log(res.days);
            res;
            console.log("Me llegó algo");
            if (res?.days) setSchedule([...res.days]);
        })
    }, [session]);
    useEffect(() => {
        fetchSchedule();
    }, [session, fetchSchedule])
    // console.log("Result days es: " + result?.days);
    const [schedule, setSchedule] = React.useState<IDay[]>(
        // result?.days ? [...result.days] : 
        days.map((day) => ({
            day: day,
            hours: new Array(24).fill(false)
        }))
    );
    const [modalOpen, setModalOpen] = useState(ModalStates.Closed);
    // console.log("el lunes es: " + JSON.stringify(schedule));
    return (
        <PsychologistLayout title="configurar calendario" pageDescription="">
            
        <AddPeriodModal schedule={schedule} setSchedule={setSchedule} state={modalOpen} close={()=>setModalOpen(ModalStates.Closed)}/>
        <Toolbar/>
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{ fontSize: { xs: 22, md: 32 }, fontWeight: 500 }}
        >
          Configurar Agenda
        </Typography>
        <Stack direction="row" sx={{ height: '80vh'}}>
        
        <List>
            <ListItem key="addPeriod">
                <ListItemButton onClick={() => setModalOpen(ModalStates.Add)}>
                    <ListItemIcon>
                        <AddBox/>
                    </ListItemIcon>
                    <ListItemText primary="Agregar periodo"/>
                </ListItemButton>
            </ListItem>
            <ListItem key="removePeriod">
                <ListItemButton onClick={() => setModalOpen(ModalStates.Remove)}>
                    <ListItemIcon>
                        <DisabledByDefault/>
                    </ListItemIcon>
                    <ListItemText primary="Eliminar periodo"/>
                </ListItemButton>
            </ListItem>
            <Divider/>
            <ThemeProvider theme={scheduleTheme}>
            <ListItem>
                <ListItemIcon>
                    <Circle color="primary"/>
                </ListItemIcon>
                <ListItemText primary="Disponible"/>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <Circle color="secondary"/>
                </ListItemIcon>
                <ListItemText primary="No disponible"/>
            </ListItem>
            </ThemeProvider>
            <Divider/>
            <ListItem onClick={updateSchedule}>
                <ListItemButton>
                    <ListItemText primary="Guardar cambios"/>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton onClick={fetchSchedule}>
                    <ListItemText primary="Cancelar cambios"/>
                </ListItemButton>
            </ListItem>
        </List>
        
        {/* <Box id="box1" sx = {{ height: '100vh'}}>
        <Toolbar/>
        <Box id="box2"sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100vw'}}>
        <Box id="box3" sx={{width: '100vw'}}> */}
        {/* <Paper sx={{ width: '100%',  }}> */}
        <ScheduleTable schedule={schedule}/>
        {/* </Box>
        </Box>
        </Box> */}
        {/* </Paper> */}
        </Stack>
        </PsychologistLayout>
    )
}