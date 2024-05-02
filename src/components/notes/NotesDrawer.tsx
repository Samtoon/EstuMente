import PaperComponent from "@/app/pruebas/Draggable";
import SlideTransition from "@/app/pruebas/Transition";
import { Dialog, DialogContent, DialogTitle, Paper, PaperProps, Slide, Tab, Tabs } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { JSXElementConstructor, ReactElement } from "react";
import Draggable from "react-draggable";
import SwipeableViews from "react-swipeable-views";
import EditNotePanel from "./drawer panels/EditNotePanel";
import ListNotesPanel from "./drawer panels/ListNotesPanel";
import "@/styles/notes/notes-drawer.css"
export default function NotesDrawer({ open, handleClose }: { open: boolean, handleClose: () => void }) {
    console.log("Me vuelvo a renderizar");
    const [value, setValue] = React.useState(0);
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


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            sx={{
                "& .MuiDialog-container": {
                    justifyContent: "flex-end"
                }
            }}
            TransitionComponent={SlideTransition}
            PaperComponent={PaperComponent}
            aria-labelledby="DialogTitle"
            keepMounted
        >
            <DialogTitle id="DialogTitle" style={{ cursor: 'move' }}>
                Notas
            </DialogTitle>
            <DialogContent>
                {/* Aquí va el componente Quill */}
                <Tabs
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="basic tabs example"
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                >    
                    <Tab label="Nueva nota" value={0}/>
                    <Tab label="Notas guardadas" value={1}/>
                </Tabs>
                <SwipeableViews index={value} id="swipeable-views">
                    <EditNotePanel/>
                    <ListNotesPanel/>
                </SwipeableViews>
            </DialogContent>
        </Dialog>
    )
}