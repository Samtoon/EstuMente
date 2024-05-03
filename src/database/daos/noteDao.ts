import { INote } from "@/interfaces/INote";
import Note from "../models/Note";

export async function getNotesByPatient(psychologist: string, patient: string) {
    const notes = await Note.find({ psychologist: psychologist, patient: patient }).lean();
    return notes;
}

export async function createNote(note: INote) {
    const result = await Note.create(note);
    return result ? true : false;
}

