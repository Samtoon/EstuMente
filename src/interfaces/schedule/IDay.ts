import { ITimespan } from "./ITimespan";

export interface IDay {
    day: "Lunes" | "Martes" | "Miércoles" | "Jueves" | "Viernes" | "Sábado" | "Domingo",
    timespans: ITimespan[]
}