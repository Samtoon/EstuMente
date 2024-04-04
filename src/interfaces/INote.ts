import { IAppointment } from "./appointment";

export interface INote {
  _id: string;
  text: string;
  appointment: IAppointment | string;
}
