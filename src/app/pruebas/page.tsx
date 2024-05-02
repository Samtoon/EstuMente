"use client"
import { PsychologistLayout } from "@/components/layout/PsychologistLayout";
import NotesDrawer from "@/components/notes/NotesDrawer";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Button, Dialog, DialogContent, DialogTitle, Paper, PaperProps, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { ReactNode, useState } from "react";
import Draggable from "react-draggable"
import SlideTransition from "./Transition";

interface Props {

}

// function Transition({ children } : { children: JSX.Element }) {
//     return(
//         <Slide direction="up">
//             {children}
//         </Slide>
//     )
// }






export default function Pruebas(props: Props) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    console.log("Open es: " + open);
    return (
        <PsychologistLayout title="Pruebas" pageDescription="Pruebas">
            <h1>Pruebas</h1>

            <Button color="secondary" onClick={() => setOpen(true)}>
                Abrir Notas
            </Button>
            <NotesDrawer open={open} handleClose={() => setOpen(false)}/>
            <ReactQuill theme="snow" value={value} onChange={setValue} />
        </PsychologistLayout>
    )
}