import { Types } from "mongoose";
import Roles from "../_enums/Roles";

export default interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  password?: string;
  role: Roles;
  phone?: string;
  profilePicture?: string;
  accept?: boolean;
  state?: string;
  gender?: string;
  supportingDocumentId?: string;
  createdAt?: string;
  updatedAt?: string;
  dateOfBirth?: Date;
  career?: string;
  semester?: number;
  age?: number;
  responsibleUser?: Types.ObjectId;
}
