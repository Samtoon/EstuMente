import { IAppointment } from "@/interfaces/IAppointment";
import { ISchedule } from "@/interfaces/schedule/ISchedule";
import { days } from "./constants";
import { IUpcomingAppointment } from "@/interfaces/IUpcomingAppointment";
import { IDay } from "@/interfaces/schedule/IDay";
import { isEqual } from "date-fns";

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

export function getAvailableHours(date: Date, appointments: IUpcomingAppointment[], schedule: ISchedule) {
    const hours: boolean[] = [];
    schedule.days[schedule.days.findIndex(isDay, date)].hours.map((hour) => hours.push(hour));
    appointments.map((appointment) => {
            // console.log("Hay appointments, la fecha de la cita es " + appointment.date + " y la fecha entregada " + date);
            if (isEqual(appointment.date, date)) {
                hours[appointment.hour] = false;
            }
        });
    return hours;
}

export function isDayAvailable(date: Date, appointments: IUpcomingAppointment[], schedule: ISchedule) {
    const hours = getAvailableHours(date, appointments, schedule);
    for (let i = 0; i < hours.length; i++) {
        if (hours[i]) return true;
    }
    return false;
}

