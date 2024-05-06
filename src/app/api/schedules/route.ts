import { fetchPsychologists } from "@/database/connection";
import { getScheduleByEmail, getScheduleById, getScheduleByPsychologist, setScheduleByEmail, updateScheduleByPsychologist } from "@/database/daos/scheduleDao";
import { IDay } from "@/interfaces/schedule/IDay";
import { ISchedule } from "@/interfaces/schedule/ISchedule";

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url)
    const email = searchParams.get("email");
    const id = searchParams.get("id");
    const psychologist = searchParams.get("psychologist");
    if (psychologist) {
        const schedule = await getScheduleByPsychologist(psychologist);
        return Response.json(schedule ? schedule : {});
    }
    else if (email) {
        console.log("Soy el post. El email es: " + email);
        const schedule = await getScheduleByEmail(email!);
        console.log("Voy a mandar esto:");
        console.log(schedule);
        return Response.json(schedule ? schedule : {});
    }
    else if (id) {
        const schedule = await getScheduleById(id);
        return Response.json(schedule ? schedule : {});
    }
    return Response.json({});
}

export async function POST(req: Request) {
    console.log("Llamando al post");
    const { psychologist, schedule }: { psychologist: string, schedule: IDay[] } = await req.json();
    await updateScheduleByPsychologist(psychologist, schedule);
    return Response.json({});
}