import { RoomProperties } from "@/classes/RoomProperties";
import { IRoom } from "@/interfaces/IRoom";
import { dailyHeaders } from "@/utils/constants";
import { DAILY_API_URL } from "@/utils/endpoints";

export function localHourToTimestamps(hour: number, ISODate: string) {
    const date = new Date(ISODate);
    const localHour = hour + 5 - date.getTimezoneOffset() / 60;
    date.setHours(localHour);
    const startTimestamp = date.getTime() / 1000;
    date.setHours(localHour + 1);
    const endTimestamp = date.getTime() / 1000;
    return { startTimestamp: startTimestamp, endTimestamp: endTimestamp };
}

export async function createRoom(nbf: number, exp: number) {
    const roomProperties = new RoomProperties(nbf, exp);
    const response = await fetch(`${DAILY_API_URL}rooms`, {
        method: "POST",
        body: JSON.stringify(roomProperties),
        headers: dailyHeaders,
    });
    if (!response.ok) return null;
    const data: IRoom = await response.json();
    return data;
}