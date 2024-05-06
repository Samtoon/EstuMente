import PaperComponent from "@/components/notes/Draggable";
import SlideTransition from "@/components/notes/Transition";
import { Dialog, DialogContent, DialogTitle, IconButton, Paper, PaperProps, Slide, Tab, Tabs, withStyles } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { JSXElementConstructor, ReactElement, useState } from "react";
import Draggable from "react-draggable";
import SwipeableViews from "react-swipeable-views";
import EditNotePanel from "./drawer panels/EditNotePanel";
import ListNotesPanel from "./drawer panels/ListNotesPanel";
import MinimizeIcon from '@mui/icons-material/Minimize';
import "@/styles/notes/notes-drawer.css"
import { INote } from "@/interfaces/INote";
import { fetchNotesByPatient } from "@/utils/actions";
import { useSession } from "next-auth/react";



export default function NotesDrawer({ open, handleClose }: { open: boolean, handleClose: () => void }) {
    console.log("Me vuelvo a renderizar");
    const {data: session} = useSession();
    const [value, setValue] = React.useState(0);
    const [shouldUpdate, setShouldUpdate] = useState(true);
    console.log("shouldUpdate en el padre es:" + shouldUpdate);
    const [selectedNote, setSelectedNote] = useState<INote | undefined>(undefined);
    const styles = {
        slide: {
            padding: 15,
            minHeight: 100,
            color: '#fff',
        },
        slide1: {
            background: '#FEA900',
        },
        slide2: {
            background: '#B3DC4A',
        },
        slide3: {
            background: '#6AC0FF',
        },
    };
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    function checkNote(note: INote) {
        setValue(2);
        setSelectedNote(note);
    }
    return (
        <Dialog
            open={open}
            sx={{
                "& .MuiDialog-container": {
                    justifyContent: "flex-end"
                }
            }}
            TransitionComponent={SlideTransition}
            PaperComponent={PaperComponent}
            aria-labelledby="DialogTitle"
            keepMounted
            disableEnforceFocus
            style={{ pointerEvents: 'none' }}
            PaperProps={{ style: { pointerEvents: 'auto' } }}
            hideBackdrop={true}
        >
            <DialogTitle id="DialogTitle" style={{ cursor: 'move' }}>
                Notas
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8
                }}
                color="secondary"
            >
                <MinimizeIcon />
            </IconButton>
            <DialogContent sx={{ paddingTop: 0, paddingBottom: 0 }}>
                {/* Aquí va el componente Quill */}
                <Tabs
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="basic tabs example"
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                >
                    <Tab label="Nueva nota" value={0} />
                    <Tab label="Notas guardadas" value={1} />
                    <Tab label="Ver nota" value={2} disabled/>
                </Tabs>
                <SwipeableViews index={value} id="swipeable-views">
                    <EditNotePanel trigger={setShouldUpdate}/>
                    <ListNotesPanel checkNote={checkNote} shouldUpdate={shouldUpdate} setShouldUpdate={setShouldUpdate}/>
                    <EditNotePanel selectedNote={selectedNote} trigger={setShouldUpdate}/>
                </SwipeableViews>
            </DialogContent>
        </Dialog>
    )
}