import { Button } from "@mui/material";
import { useState } from "react";
import ReactQuill from "react-quill";

export default function EditNotePanel() {
  const [value, setValue] = useState("<h1>Esto es Esparta	</h1><ol><li>Dijeron los espartanos</li><li>Luego, todos murieron</li></ol><ul><li>Debe mejorar</li><li>alñskd</li></ul><p><br></p>");

  return (
    <div className="edit-note-panel">
      <ReactQuill theme="snow" value={value} onChange={setValue} />
      <Button id="save-note-button" color="secondary" onClick={() => console.log(value)}>Guardar</Button>
      {/* <div dangerouslySetInnerHTML={{ __html: value }}/> */}
      <div/>
    </div>
  );
}