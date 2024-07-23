import { MenuItem, TextField } from "@mui/material";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import GenderDialog from "./GenderDialog";

export default function GenderField({ readOnly }: { readOnly?: boolean }) {
  const addOption = "Añadir género personalizado...";
  const [open, setOpen] = useState(false);
  const [customGender, setCustomGender] = useState("");
  const options = [
    "Masculino",
    "Femenino",
    "Prefiero no decirlo",
    customGender,
    addOption,
  ];
  const [selection, setSelection] = useState(options[2]);
  useEffect(() => {
    if (customGender) {
      setSelection(customGender);
    }
  }, [customGender, setSelection]);
  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    if (event.target.value === addOption) {
      setOpen(true);
    } else {
      setSelection(event.target.value);
    }
  }

  return (
    <>
      <TextField
        select
        value={selection}
        onChange={handleChange}
        fullWidth
        label="Género"
        name="Género"
        InputProps={{ readOnly }}
      >
        {options
          .filter((option) => option.length > 0)
          .map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
      </TextField>
      <GenderDialog
        open={open}
        onClose={() => setOpen(false)}
        setGender={setCustomGender}
      />
    </>
  );
}
