import { fetchPsychologists } from "@/database/connection";

export async function GET(req: Request) {
    const result = await fetchPsychologists();
    return Response.json({result});
}