import { IPreviousAppointment } from "./IPreviousAppointment";

export interface INote {
  _id?: string;
  text: string;
  appointment: string;
  patient: string;
  createdAt: Date;
}
