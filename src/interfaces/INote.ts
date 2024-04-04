import { IAppointment } from "./IAppointment";

export interface INote {
  _id: string;
  text: string;
  appointment: IAppointment | string;
}
