import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function GenderDialog({
  open,
  onClose,
  setGender,
}: {
  open: boolean;
  onClose: () => void;
  setGender: (gender: string) => void;
}) {
  function handleSubmit(formData: FormData) {
    const gender = formData.get("gender")?.toString();
    if (gender) {
      setGender(gender);
    }
    onClose();
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Género personalizado</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Por favor ingresa el género con el que te identificas
        </DialogContentText>
        <form id="genderForm" action={handleSubmit}>
          <TextField label="Género" name="gender" />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" form="genderForm">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
}
