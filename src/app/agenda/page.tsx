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
import { useState } from "react";
import { IDay } from "@/interfaces/schedule/IDay";
import React from "react";
import List from "@mui/material/List/List";
import { Dialog, Divider, InputLabel, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Modal, Select } from "@mui/material";
import { AddBox, DisabledByDefault, ExpandLess, ExpandMore } from "@mui/icons-material";
import Hour from "@/utils/hour";

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

async function AddPeriodModal({schedule, setSchedule, state, close} : 
    {
        schedule: IDay[], 
        setSchedule: React.Dispatch<React.SetStateAction<IDay[]>>,
        state: ModalStates,
        close: ()=>void
    }) {
        const res = await fetch("/api/ejemplo");
        console.log("Este es el resultado");
        console.log(JSON.stringify(res));
        let dia: IDay["day"];
        let horaInicial: number;
        let horaFinal: number;
        console.log("el estado de la modal es:" + state);
        function handleUpdate() {
            const i = days.indexOf(dia);
            for (let j = horaInicial; j <= horaFinal; j++) {
                // schedule.hours[i] = true;
                schedule[i].hours[j] = state === ModalStates.Add ? true : false;
            }
            // console.log("Ahora las horas son: " + schedule.hours);
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
                        <MenuItem value={day}>{day}</MenuItem>
                    ))}
                </Select>
                <InputLabel id="horaInicial">Desde las:</InputLabel>
                <Select labelId="horaInicial" onChange={(e) => {horaInicial = e.target.value as number}} fullWidth>
                    {hours.map((hour) => 
                        <MenuItem value={hour.getValue()}>{hour.getString()}</MenuItem>
                    )}
                </Select>
                <InputLabel id="horaFinal">Hasta las:</InputLabel>
                <Select labelId="horaFinal" onChange={(e) => {horaFinal = e.target.value as number}} fullWidth>
                {hours.map((hour) => 
                        <MenuItem value={hour.getValue()}>{hour.getString()}</MenuItem>
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
    const [schedule, setSchedule] = React.useState<IDay[]>(days.map((day) => ({
        day: day,
        hours: new Array(24).fill(false)
    })));
    const [modalOpen, setModalOpen] = useState(ModalStates.Closed);
    console.log("el lunes es: " + JSON.stringify(schedule));
    return (
        <>
        <AddPeriodModal schedule={schedule} setSchedule={setSchedule} state={modalOpen} close={()=>setModalOpen(ModalStates.Closed)}/>
        <Toolbar/>
        <Stack direction="row" sx={{ height: '80vh'}}>
        <List>
            <ListItem>
                <ListItemButton onClick={() => setModalOpen(ModalStates.Add)}>
                    <ListItemIcon>
                        <AddBox/>
                    </ListItemIcon>
                    <ListItemText primary="Agregar periodo"/>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton onClick={() => setModalOpen(ModalStates.Remove)}>
                    <ListItemIcon>
                        <DisabledByDefault/>
                    </ListItemIcon>
                    <ListItemText primary="Eliminar periodo"/>
                </ListItemButton>
            </ListItem>
            {/* <Divider/>
            {days.map((day) => <DayList day={day}/>)} */}
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
                            <TableCell sx={{backgroundColor:"purple", color:"white"}}>{day}</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {hours.map((hour) =>
                        <TableRow>
                            <TableCell>{hour.getString()}</TableCell>
                            {days.map((day, index) => <TableCell sx={{paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: schedule[index].hours[hour.getValue()] ? "violet" : "whitesmoke"}}>
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
        </>
    )
}