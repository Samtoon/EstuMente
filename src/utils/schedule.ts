import { IPreviousAppointment } from "@/interfaces/IPreviousAppointment";
import { ISchedule } from "@/interfaces/schedule/ISchedule";
import { days } from "./constants";
import { IUpcomingAppointment } from "@/interfaces/IUpcomingAppointment";
import { IDay } from "@/interfaces/schedule/IDay";
import { isEqual } from "date-fns";
import { getColombianHour } from "./hour";

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
    if (isSameDay(date, new Date())) {
        hours.fill(false, 0, getColombianHour());
    }

    return hours;
}

export function isDayAvailable(date: Date, appointments: IUpcomingAppointment[], schedule: ISchedule) {
    const hours = getAvailableHours(date, appointments, schedule);
    for (let i = 0; i < hours.length; i++) {
        if (hours[i]) return true;
    }
    return false;
}

export function isAppointmentTime(appointmentDate: Date, appointmentHour: number) {
    const date1 = new Date(appointmentDate)
    const date2 = new Date();
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);
    console.log(`la fecha 1 es ${date1} y la 2 ${date2}.
    Las horas ${appointmentHour} y ${getColombianHour()}
    `);
    return isEqual(date1, date2) && appointmentHour === getColombianHour();
}

export function isSameDay(date1: Date, date2: Date) {
    return date1.getUTCFullYear() === date2.getUTCFullYear() &&
        date1.getUTCMonth() === date2.getUTCMonth() &&
        date1.getUTCDate() === date2.getUTCDate();
}

