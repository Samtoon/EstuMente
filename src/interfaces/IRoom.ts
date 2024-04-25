import { IProperties } from "@/classes/RoomProperties";

export interface IRoom {
    id: string,
    name: string,
    url: string,
    config: IProperties
}