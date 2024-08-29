import mongoose, { Schema, model, Model } from "mongoose";
import IUser from "../../_interfaces/IUser";
import Roles from "@/app/_enums/Roles";

const userSchema = new Schema<IUser>(
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
    fullName: String,
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
      enum: Object.values(Roles),
    },
    phone: {
      type: String,
    },
    profilePicture: String,
    accept: {
      type: Boolean,
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
    career: String,
    dateOfBirth: Date,
    semester: Number,
    responsibleUser: Schema.Types.ObjectId,
<<<<<<< HEAD
    totalTimeSpent: { type: Number, default: 0, required: true },
=======
>>>>>>> 8eea2ccdbe020cb45315b20374ed9dc1acc12758
  },
  { timestamps: true }
);

userSchema.index({ firstName: "text", lastName: "text" });

const User: Model<IUser> = mongoose.models.User || model("User", userSchema);

export default User;
