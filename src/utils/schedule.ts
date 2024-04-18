import { IAppointment } from "@/interfaces/IAppointment";
import { ISchedule } from "@/interfaces/schedule/ISchedule";
import { days } from "./constants";
import { IUpcomingAppointment } from "@/interfaces/IUpcomingAppointment";
import { IDay } from "@/interfaces/schedule/IDay";

export function processAvailability(baseSchedule: ISchedule, appointments: IUpcomingAppointment[]) {
    const schedule: ISchedule = {...baseSchedule};
    appointments.map((appointment) => {
        schedule.days[schedule.days.findIndex(isDay, appointment.date)].hours[appointment.hour] = false;
    })
    return schedule;
}

function isDay(this: Date, day: IDay) {
    return day.day === getEsDay(this);
}

export function getEsDay(date: Date) {
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    return days[date.getDay()];
}