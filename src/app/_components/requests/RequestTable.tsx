'use client'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import RequestModal from "./RequestModal";
import { IRequest } from "@/app/_interfaces/IRequest";
import Roles from "@/app/_enums/Roles";

export default function RequestTable({ requests }: { requests: IRequest[] }) {
    const [open, setOpen] = useState(false);
    const [requestIndex, setRequestIndex] = useState(-1);
    console.log("Se llama la tabla");
    return (
        <>
            <RequestModal open={open} handleClose={() => setOpen(false)} index={requestIndex} requestList={requests} />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: "purple", color: "white", borderLeft: 1, fontWeight: "bold" }}>Apellidos</TableCell>
                            <TableCell sx={{ backgroundColor: "purple", color: "white", borderLeft: 1, fontWeight: "bold" }}>Nombres</TableCell>
                            <TableCell sx={{ backgroundColor: "purple", color: "white", borderLeft: 1, fontWeight: "bold" }}>Rol solicitado</TableCell>
                            <TableCell sx={{ backgroundColor: "purple", color: "white", borderLeft: 1, fontWeight: "bold" }}>Fecha solicitud</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            requests.map((request, index) =>
                                <TableRow key={`row${index}`} hover sx={{ cursor: 'pointer' }} onClick={() => {
                                    setOpen(true);
                                    setRequestIndex(index);
                                }}>
                                    <TableCell>{request.lastName}</TableCell>
                                    <TableCell>{request.firstName}</TableCell>
                                    <TableCell>{request.requestedRole}</TableCell>
                                    <TableCell>{new Date(request.createdAt!).toLocaleString()}</TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}