import { INote } from "@/app/_interfaces/INote";
import { saveNote } from "@/app/_utils/server actions/note";
import { stripTags } from "@/app/_utils/html";
import { Button, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { EventHandler, useEffect, useMemo, useRef, useState } from "react";
import 'react-quill/dist/quill.snow.css';
// import ReactQuill from "react-quill";

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link']
  ],
}

export default function EditNotePanel({ selectedNote, trigger }: { selectedNote?: INote, trigger: (value: boolean) => void }) {
  const { data: session } = useSession();
  const [content, setContent] = useState("<ol><li>Dijeron los espartanos</li><li>Luego, todos murieron</li></ol><ul><li>Debe mejorar</li><li>alñskd</li></ul><p><br></p>");
  const [title, setTitle] = useState("");
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
  async function handleClick() {
    if (title !== "" && stripTags(content) !== "") {
      let note: INote;
      if (selectedNote) {
        note = { ...selectedNote, title: title, content: content };
      } else {
        note = {
          title: title,
          content: content,
          psychologist: session?.psychologist?._id!,
          patient: session?.user._id!
        }
        setContent("");
        setTitle("");
      }
      await saveNote(note);
      trigger(true);
    }
  }
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    }
  }, [selectedNote])

  return (
    <div className="notes-panel">
      <TextField label="Título" value={title} onChange={e => setTitle(e.target.value)} />
      <ReactQuill theme="snow" value={content} onChange={setContent} modules={modules} />
      <Button id="save-note-button" color="secondary" onClick={handleClick}>{
        selectedNote ?
          "Editar" :
          "Guardar"
      }</Button>
    </div>
  );
}