import { compareDates } from "@/utils/actions";

export async function GET() {
    const noMovedAppointments = await compareDates();
    return Response.json({ mensaje: `Se movieron ${noMovedAppointments} con éxito`});
}