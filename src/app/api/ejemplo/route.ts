import { fetchPsychologists, getScheduleByEmail, setScheduleByEmail } from "@/database/connection";
import { IDay } from "@/interfaces/schedule/IDay";
import { ISchedule } from "@/interfaces/schedule/ISchedule";

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url)
    const email = searchParams.get("email");
    console.log("Soy el post. El email es: " + email);
    const schedule = await getScheduleByEmail(email!);
    console.log("Voy a mandar esto:");
    console.log(schedule);
    return Response.json(schedule ? schedule : {});
}

export async function POST(req: Request) {
    console.log("Llamando al post");
    const { email, schedule }: { email: string, schedule: IDay[] } = await req.json();
    await setScheduleByEmail(email, schedule);
    return Response.json({});
}