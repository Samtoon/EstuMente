import { IPsychologist } from "@/interfaces/IPsychologist";
import mongoose, { Schema, model, Model } from "mongoose";


const psychologistSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      trim: true,
    },
    profilePicture: {
      type: String
    },
    slug: { type: String, required: true, unique: true },
    bio: { type: String, default: "" },
    calification: {
      type: Number,
      default: 0,
    },
    specialties: [{ type: String }],
    services: [{ type: String }],
    isPublic: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

psychologistSchema.index({
  fullName: "text",
  gender: "text",
  specialties: "text",
});

const Psychologist: Model<IPsychologist> =
  mongoose.models.Psychologist || model("Psychologist", psychologistSchema);

export default Psychologist;
