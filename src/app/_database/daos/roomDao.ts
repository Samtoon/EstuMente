import { RoomProperties } from "@/app/_classes/RoomProperties";
import { IRoom } from "@/app/_interfaces/IRoom";
import { dailyHeaders } from "@/app/_utils/constants";
import { DAILY_API_URL } from "@/app/_utils/endpoints";

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

export async function deleteRoom(roomName: string) {
  const response = await fetch(`${DAILY_API_URL}rooms/${roomName}`, {
    method: "DELETE",
    headers: dailyHeaders,
  });
  console.log("Petición enviada a daily.co. Esta fue su respuesta: ");
  console.log(response);
  return response.ok;
}
