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
import { AddBox, ExpandLess, ExpandMore } from "@mui/icons-material";

interface state {
    day: IDay["day"],
    open: boolean
}

const hours: string[] = [];
const days: IDay["day"][] = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
for (let hour = 0; hour < 24; hour++) {
    hours.push((hour < 10 ? "0" + hour : "" + hour) + ":00");
}
console.log("Hours es: " + hours);

function DayList({day} : {day: IDay["day"]}) {
    const [open, setOpen] = useState(false);
    return(
        <ListItemButton id={day} onClick={()=>{
            setOpen(!open);
        }}>
            <ListItemText primary={day}/>
            {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
    )
}

function AddPeriodModal({schedule, setSchedule, open, close} : 
    {
        schedule: IDay[], 
        setSchedule: React.Dispatch<React.SetStateAction<IDay[]>>,
        open: boolean,
        close: ()=>void
    }) {
        return(
            <Dialog
                open={open}
                onClose={close}
            >
                <Box sx = {{width: 300, height: 300}}>
                <InputLabel id="horaInicial">Desde las:</InputLabel>
                <Select labelId="horaInicial">
                    {hours.map((hour) => 
                        <MenuItem value={hour}>{hour}</MenuItem>
                    )}
                </Select>
                <InputLabel id="horaFinal">Hasta las:</InputLabel>
                <Select labelId="horaFinal">
                {hours.map((hour) => 
                        <MenuItem value={hour}>{hour}</MenuItem>
                    )}
                </Select>
                </Box>
            </Dialog>
        )
    }

export default function ConfigureSchedulePage() {
    const [schedule, setSchedule] = React.useState<IDay[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <>
        <AddPeriodModal schedule={schedule} setSchedule={setSchedule} open={modalOpen} close={()=>setModalOpen(false)}/>
        <Toolbar/>
        <Stack direction="row" sx={{ height: '80vh'}}>
        <List>
            <ListItem>
                <ListItemButton onClick={() => setModalOpen(true)}>
                    <ListItemIcon>
                        <AddBox/>
                    </ListItemIcon>
                    <ListItemText primary="Agregar periodo"/>
                </ListItemButton>
            </ListItem>
            <Divider/>
            {days.map((day) => <DayList day={day}/>)}
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
                            <TableCell>{hour}</TableCell>
                            {days.map((day) => <TableCell sx={{paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0}}>
                                <Button size="large" sx={{paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 1, minHeight: "32px", width: "100%", backgroundColor: day === "Lunes" ? "violet" : "cyan"}}>
                                    
                                </Button>
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