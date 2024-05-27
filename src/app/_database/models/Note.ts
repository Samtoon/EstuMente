import { INote } from "@/app/_interfaces/INote";
import mongoose, { Model, Schema, model } from "mongoose";

const noteSchema = new Schema<INote>({
    title: String,
    content: String,
    appointment: Schema.Types.ObjectId,
    patient: { type: Schema.Types.ObjectId, required: true },
    psychologist: { type: Schema.Types.ObjectId, required: true }
}, { timestamps: true }
);

const Note: Model<INote> = mongoose.models.Note || model("Note", noteSchema);

export default Note;