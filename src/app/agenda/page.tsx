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

export default function ConfigureSchedulePage() {
    const hours: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
        hours.push((hour < 10 ? "0" + hour : "" + hour) + ":00");
    }
    console.log("Hours es: " + hours);
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    return (
        <>
        <Box sx = {{ height: '100vh'}}>
        {/* <Toolbar/> */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
        <Box>
        {/* <Paper sx={{ width: '100%',  }}> */}
        <TableContainer sx={{ height: 300, maxWidth: '70vw'}}>
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
                                <Button size="large" sx={{paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderRadius: 1, minHeight: "32px", width: "100%"}}>
                                    
                                </Button>
                            </TableCell>)}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
        </Box>
        </Box>
        </Box>
        {/* </Paper> */}
        
        </>
    )
}