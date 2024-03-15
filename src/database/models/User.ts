import mongoose, { Schema, model, Model } from "mongoose";
import IUser from "../../interfaces/IUser";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: {
        values: ["Administrador", "Consultante", "Practicante", "Tutor", "Coordinador"],
        message: "{VALUES} no es un role válido",
        default: "patient",
        required: true,
      },
    },
    phone: {
      type: String
    },
    profilePicture: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    accept: {
      type: Boolean
    },
    state: {
      type: String,
      enum: {
        values: ["activo", "inactivo", "revision"],
        message: "{VALUES} no es un estado válido",
        default: "activo",
        required: true,
      },
    },
    gender: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

userSchema.index({ firstName: "text", lastName: "text" });

const User: Model<IUser> = mongoose.models.User || model("User", userSchema);

export default User;