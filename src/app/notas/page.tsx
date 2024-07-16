"use client"
import { Box } from "@mui/material";
import PageHeader from "../_components/PageHeader";
import { PsychologistLayout } from "../_components/layout/PsychologistLayout";
import ListNotesPanel from "../_components/notes/drawer panels/ListNotesPanel";
import EditNotePanel from "../_components/notes/drawer panels/EditNotePanel";
import styles from "@/app/_styles/notes/notesTest.module.css"
import { useState } from "react";
import { INote } from "../_interfaces/INote";

export default function Notas() {
    const [selectedNote, setSelectedNote] = useState<INote | undefined>(undefined);
    const [shouldUpdate, setShouldUpdate] = useState(true);
    return (
        <>
            <PageHeader header="Mis Notas" />
            <Box display="flex" flexDirection="row" width="100%" px={5} className={styles["content"]}>
                <Box className={styles["list-container"]}>
                    <ListNotesPanel 
                    checkNote={setSelectedNote} 
                    shouldUpdate={shouldUpdate} 
                    setShouldUpdate={setShouldUpdate} 
                    filterPatient
                    />
                </Box>
                <Box display="flex" flexGrow={1} className={styles["fill"]}>
                    <EditNotePanel trigger={setShouldUpdate} selectedNote={selectedNote}/>
                </Box>
            </Box>
        </>

    );
}