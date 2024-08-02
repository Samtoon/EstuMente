"use client";
import { Box } from "@mui/material";
import PageHeader from "../_components/PageHeader";
import { PsychologistLayout } from "../_components/layout/PsychologistLayout";
import ListNotesPanel from "../_components/notes/drawer panels/ListNotesPanel";
import EditNotePanel from "../_components/notes/drawer panels/EditNotePanel";
import styles from "@/app/_styles/notes/notesTest.module.css";
import { Suspense, useEffect, useState } from "react";
import { INote } from "../_interfaces/INote";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { fetchNoteById } from "../_utils/server actions/note";

function Notas() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const noteId = searchParams.get("id");
  const { replace } = useRouter();

  const [selectedNote, setSelectedNote] = useState<INote | undefined>(
    undefined
  );
  useEffect(() => {
    console.log("corre useEffect");
    if (noteId && !selectedNote) {
      fetchNoteById(noteId).then((note) => setSelectedNote(note));
    }
  }, [noteId, selectedNote, setSelectedNote]);

  function searchNote(note: INote) {
    const params = new URLSearchParams(searchParams);
    if (note) {
      params.set("id", note._id!);
    } else {
      params.delete("id");
    }
    setSelectedNote(note);
    replace(`${pathname}?${params.toString()}`);
  }
  const [shouldUpdate, setShouldUpdate] = useState(true);
  return (
    <>
      <PageHeader header="Mis Notas" />
      <Box
        display="flex"
        flexDirection="row"
        width="100%"
        px={5}
        className={styles["content"]}
      >
        <Box className={styles["list-container"]}>
          <ListNotesPanel
            checkNote={searchNote}
            shouldUpdate={shouldUpdate}
            setShouldUpdate={setShouldUpdate}
            filterPatient
          />
        </Box>
        <Box display="flex" flexGrow={1} className={styles["fill"]}>
          <EditNotePanel
            trigger={setShouldUpdate}
            selectedNote={selectedNote}
          />
        </Box>
      </Box>
    </>
  );
}

export default function NotesPage() {
  return (
    <Suspense>
      <Notas />
    </Suspense>
  );
}
