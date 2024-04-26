export interface IUpcomingAppointment {
    _id?: string,
    user: string,
    psychologist: string,
    hour: number,
    date: Date
    roomName: string,
    roomURL: string
}