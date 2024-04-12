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
import { useEffect, useState } from "react";
import { IDay } from "@/interfaces/schedule/IDay";
import React from "react";
import List from "@mui/material/List/List";
import { Dialog, Divider, InputLabel, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Modal, Select, Typography } from "@mui/material";
import { AddBox, Circle, DisabledByDefault, ExpandLess, ExpandMore } from "@mui/icons-material";
import Hour from "@/utils/hour";
import { useSession } from "next-auth/react";
import { ISchedule } from "@/interfaces/schedule/ISchedule";
import { PsychologistLayout } from "@/components/layout/PsychologistLayout";

interface state {
    day: IDay["day"],
    open: boolean
}

enum ModalStates {
    Closed = 0,
    Add = 1,
    Remove = 2
}

const hours: Hour[] = [];
const selectedHours: boolean[] = [];
const days: IDay["day"][] = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
for (let hour = 0; hour < 24; hour++) {
    hours.push(new Hour(hour));
    selectedHours.push(false);
}
console.log("Hours es: " + hours);



function AddPeriodModal({schedule, setSchedule, state, close} : 
    {
        schedule: IDay[], 
        setSchedule: React.Dispatch<React.SetStateAction<IDay[]>>,
        state: ModalStates,
        close: ()=>void
    }) {
        const {data: session} = useSession();
        let dia: IDay["day"];
        let horaInicial: number;
        let horaFinal: number;
        console.log("el estado de la modal es:" + state);
        function updateSchedule() {
            fetch("http://localhost:3000/api/ejemplo", {
                method: "POST",
                body: JSON.stringify({
                    email: session?.user.email,
                    schedule: schedule
                })
            })
        }
        function handleUpdate() {
            const i = days.indexOf(dia);
            for (let j = horaInicial; j <= horaFinal; j++) {
                // schedule.hours[i] = true;
                schedule[i].hours[j] = state === ModalStates.Add ? true : false;
            }
            // console.log("Ahora las horas son: " + schedule.hours);
            updateSchedule();
            setSchedule([...schedule]);
            close();
        }
        return(
            <Dialog
                open={state !== ModalStates.Closed}
                onClose={close}
            >
                <form id="modalForm" action={handleUpdate}>
                <Box padding={2}>
                <InputLabel id="dia">Día:</InputLabel>
                <Select labelId="dia" onChange={(e) => {dia = e.target.value as IDay["day"]}} fullWidth>
                    {days.map((day) => (
                        <MenuItem key={`opcion${day}`} value={day}>{day}</MenuItem>
                    ))}
                </Select>
                <InputLabel id="horaInicial">Desde las:</InputLabel>
                <Select labelId="horaInicial" onChange={(e) => {horaInicial = e.target.value as number}} fullWidth>
                    {hours.map((hour) => 
                        <MenuItem key={`opcion${hour}inicial`} value={hour.getValue()}>{hour.getString()}</MenuItem>
                    )}
                </Select>
                <InputLabel id="horaFinal">Hasta las:</InputLabel>
                <Select labelId="horaFinal" onChange={(e) => {horaFinal = e.target.value as number}} fullWidth>
                {hours.map((hour) => 
                        <MenuItem key={`opcion${hour}final`} value={hour.getValue()}>{hour.getString()}</MenuItem>
                    )}
                </Select>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" padding={2}>
                    <Button size="large" color={state === ModalStates.Add ? "secondary" : "error"} onClick={handleUpdate}>
                        {state !== ModalStates.Remove ? "Agregar período" : "Eliminar período"}
                    </Button>
                    <Button onClick={close}>
                        Cancelar
                    </Button>
                </Stack>
                </Box>
                </form>
            </Dialog>
        )
    }

export default function ConfigureSchedulePage() {
    
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
    useEffect(() => {
        fetch(`http://localhost:3000/api/ejemplo?email=${session?.user.email}`).
        then((res) => res.json()).
        then((res) => {
            console.log("Este es el resultado");
            console.log(res.days);
            result = res;
            if (result?.days) setSchedule(result.days);
        })
    }, [session])
    console.log("Result days es: " + result?.days);
    const [schedule, setSchedule] = React.useState<IDay[]>(
        // result?.days ? [...result.days] : 
        days.map((day) => ({
            day: day,
            hours: new Array(24).fill(false)
        }))
    );
    const [modalOpen, setModalOpen] = useState(ModalStates.Closed);
    console.log("el lunes es: " + JSON.stringify(schedule));
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
            <ListItem>
                <ListItemIcon>
                    <Circle sx={{ color: "violet" }}/>
                </ListItemIcon>
                <ListItemText primary="Disponible"/>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <Circle sx={{ color: "whitesmoke" }}/>
                </ListItemIcon>
                <ListItemText primary="No disponible"/>
            </ListItem>
        </List>
        
        {/* <Box id="box1" sx = {{ height: '100vh'}}>
        <Toolbar/>
        <Box id="box2"sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100vw'}}>
        <Box id="box3" sx={{width: '100vw'}}> */}
        {/* <Paper sx={{ width: '100%',  }}> */}
        <TableContainer sx={{ height: '100%'}}>
            <Table size="small" stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        {days.map((day) => 
                            <TableCell key={`header${day}`} sx={{backgroundColor:"purple", color:"white", borderLeft: 1}} align="center">{day}</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {hours.map((hour) =>
                        <TableRow key={`fila${hour}`}>
                            <TableCell>{hour.getString()}</TableCell>
                            {days.map((day, index) => <TableCell key={day + hour.getString()} sx={{
                                paddingTop: 0, 
                                paddingBottom: 0, 
                                paddingLeft: 0, 
                                paddingRight: 0, 
                                backgroundColor: schedule[index].hours[hour.getValue()] ? "violet" : "whitesmoke", 
                                
                                borderLeft: 1, 
                                borderRight: index === days.length - 1 ? 1 : 0,
                                borderColor: "#e0e0e0", }}>
                                {/* <Button size="large" sx={{paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 1, minHeight: "32px", width: "100%", backgroundColor: schedule[index].hours[hour.getValue()] ? "violet" : "cyan"}}>
                                    
                                </Button> */}
                            </TableCell>)}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
        {/* </Box>
        </Box>
        </Box> */}
        {/* </Paper> */}
        </Stack>
        </PsychologistLayout>
    )
}