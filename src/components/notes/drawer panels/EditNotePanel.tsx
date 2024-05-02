import { useState } from "react";
import ReactQuill from "react-quill";

export default function EditNotePanel() {
    const [value, setValue] = useState('');

  return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}