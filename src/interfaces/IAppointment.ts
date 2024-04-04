import { INote } from "./INote";
// import { IUser } from "./user";
import IUser from "./IUser";

export interface IAppointment {
  _id?: string;
  patient: IUser | string;
  psychologist: IUser | string;
  typeService: string;
  duration: number;
  startTime: number;
  endTime: number;
  state?: string;
  hour: string;
  date: string;
  checkinTimePatient?: number;
  checkinTimePsychologist?: number;
  calification?: number;
  calificationComment?: string;
  cancelReason?: string;
  notes: INote[] | string;

  paymentResult?: string;
  cost: number;
  currency: string;

  isPaid: boolean;
  paidAt?: string;

  transactionId?: string;
  dailyUrl?: string;
  dailyRoomId?: string;
}
