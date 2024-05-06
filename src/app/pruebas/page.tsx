"use client"
import { PsychologistLayout } from "@/components/layout/PsychologistLayout";
import NotesDrawer from "@/components/notes/NotesDrawer";
import 'react-quill/dist/quill.snow.css';
import { Button } from "@mui/material";
import { useState } from "react";

interface Props {}
export default function Pruebas(props: Props) {
    const [open, setOpen] = useState(false);
    console.log("Open es: " + open);
    return (
        <PsychologistLayout title="Pruebas" pageDescription="Pruebas">
            <h1>Pruebas</h1>
            <Button color="secondary" onClick={() => setOpen(true)}>
                Abrir Notas
            </Button>
            <NotesDrawer open={open} handleClose={() => setOpen(false)}/>
        </PsychologistLayout>
    )
}