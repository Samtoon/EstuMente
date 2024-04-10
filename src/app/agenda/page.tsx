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

interface state {
    day: IDay["day"],
    open: boolean
}

export default function ConfigureSchedulePage() {
    const hours: string[] = [];
    const [openStates, setOpenStates] = React.useState<state[]>([]);
    for (let hour = 0; hour < 24; hour++) {
        hours.push((hour < 10 ? "0" + hour : "" + hour) + ":00");
    }
    console.log("Hours es: " + hours);
    const days: IDay["day"][] = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    return (
        <>
        <Toolbar/>
        <Stack direction="row">
        <div>
        <Button>Agregar periodo</Button>
        </div>
        
        {/* <Box id="box1" sx = {{ height: '100vh'}}>
        <Toolbar/>
        <Box id="box2"sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100vw'}}>
        <Box id="box3" sx={{width: '100vw'}}> */}
        {/* <Paper sx={{ width: '100%',  }}> */}
        <TableContainer>
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