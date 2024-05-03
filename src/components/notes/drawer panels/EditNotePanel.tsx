import { INote } from "@/interfaces/INote";
import { saveNote } from "@/utils/actions";
import { stripTags } from "@/utils/html";
import { Button, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { EventHandler, useRef, useState } from "react";
import ReactQuill from "react-quill";

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline','strike'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link']
    ],
  }

export default function EditNotePanel() {
  const {data: session} = useSession();
  const [content, setContent] = useState("<ol><li>Dijeron los espartanos</li><li>Luego, todos murieron</li></ol><ul><li>Debe mejorar</li><li>alñskd</li></ul><p><br></p>");
  const [title, setTitle] = useState("");
  async function handleClick() {
    if (title !== "" && stripTags(content) !== "") {
      const note: INote = {
        title: title,
        content: content,
        psychologist: session?.psychologist?._id!,
        patient: session?.user._id!
      }
      if (await saveNote(note)) {
        console.log("Nota creada con éxito");
        setContent("");
        setTitle("");
      }
    }
  }

  return (
    <div id="edit-note-panel">
      <TextField label="Título" value={title} onChange={e => setTitle(e.target.value)}/>
      <ReactQuill theme="snow" value={content} onChange={setContent} modules={modules} />
      <Button id="save-note-button" color="secondary" onClick={handleClick}>Guardar</Button>
      {/* <div dangerouslySetInnerHTML={{ __html: value }}/> */}
      <div/>
    </div>
  );
}