import { IDay } from "@/interfaces/schedule/IDay";
import Hour from "./hour";

export const days: IDay["day"][] = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export const hours: Hour[] = Array.from({length: 24}, (v, i) => new Hour(i));