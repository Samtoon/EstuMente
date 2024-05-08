import { INote } from "@/interfaces/INote";
import { fetchNotesByPatient, filterNotes } from "@/utils/actions";
import { Divider, List, ListItem, ListItemButton, ListItemText, Pagination, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SearchField from "./SearchField";
import NoteFilters from "@/enums/NoteFilters";

export default function ListNotesPanel({
    checkNote,
    shouldUpdate,
    setShouldUpdate
}: {
    checkNote: (note: INote) => void,
    shouldUpdate: boolean,
    setShouldUpdate: (shouldUpdate: boolean) => void
}) {
    const { data: session, status } = useSession();
    const [notes, setNotes] = useState([] as INote[]);
    const [filterBy, setFilterBy] = useState(NoteFilters.Title);
    const [filter, setFilter] = useState<string | Date>("");
    // function searchNotes(filter: string | Date, filterBy: NoteFilters) {
    //     filterNotes(session?.psychologist?._id!, session?.user._id!, filter, filterBy)
    //         .then((notes) => {
    //             console.log("encontré...:" + notes);
    //             setNotes(notes!);
    //             setShouldUpdate(false);
    //         })
    // }
    useEffect(() => {
        console.log("shouldUpdate es: " + shouldUpdate);
        if (shouldUpdate && session) {
            const updatePromise = filter === "" ?
            fetchNotesByPatient(session?.psychologist?._id!, session?.user._id!) :
            filterNotes(session?.psychologist?._id!, session?.user._id!, filter, filterBy);
            updatePromise.then(notes => {
                setNotes(notes);
                setShouldUpdate(false);
            });
        }
    }, [session, shouldUpdate, filter, filterBy, setShouldUpdate]);
    return (
        <div className="notes-panel">
            <SearchField
                // searchNotes={searchNotes}
                setFilter={setFilter}
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                trigger={setShouldUpdate}
            />
            <Divider />
            <List id="notes-list">
                {notes.map((note) =>
                    <ListItem disablePadding key={`list-item-${note._id!}`}>
                        <ListItemButton onClick={() => checkNote({ ...note })}>
                            <ListItemText primary={note.title} secondary={
                                `Fecha: ${new Date(note.createdAt!).toLocaleString()}`
                            } />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
            <Divider />
            <Pagination id="pagination" count={1} color="secondary" />
        </div>
    )
}