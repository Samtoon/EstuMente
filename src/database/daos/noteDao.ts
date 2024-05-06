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

export async function getNotesByTitle(psychologist: string, patient: string, title: string) {
    const notes = await Note.find({
        psychologist: psychologist, 
        patient: patient,
        title: {$regex: new RegExp(title, "i")}
    }).lean();
    console.log(`filtrando por ${title} encontré...`);
    console.log(notes)
    return notes;
}

export async function getNotesByDate(psychologist: string, patient: string, date: Date) {
    const dayStart = new Date(date);
    const dayEnd = new Date(date);
    dayEnd.setDate(dayEnd.getDate() + 1);
    console.log(`comparando entre ${dayStart} y ${dayEnd}`)
    const notes = await Note.find({
        psychologist: psychologist,
        patient: patient,
        createdAt: {$gte: dayStart, $lt: dayEnd}
    }).lean();
    return notes;
}

export async function updateNote(note: INote) {
    const result = await Note.updateOne({ _id: note._id }, note);
    return Boolean(result.modifiedCount);
}

