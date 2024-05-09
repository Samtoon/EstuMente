import { RoomProperties } from "@/classes/RoomProperties";
import { IRoom } from "@/interfaces/IRoom";
import { dailyHeaders } from "@/utils/constants";
import { DAILY_API_URL } from "@/utils/endpoints";

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