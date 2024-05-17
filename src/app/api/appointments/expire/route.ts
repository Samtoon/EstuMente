import { compareDates } from "@/utils/server actions/appointment";

export async function POST() {
    const noMovedAppointments = await compareDates();
    return Response.json({ mensaje: `Se movieron ${noMovedAppointments} con éxito`});
}