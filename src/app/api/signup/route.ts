import { NextResponse } from "next/server";
import User from "@/database/models/User";


export async function POST(req: Request) {
    const {message} = await req.json();
    return NextResponse.json({message: `Hola, el mensaje que me mandaste fue: ${message}`})
}

export async function GET() {
    return NextResponse.json({message: `Hola, mira esto: ${JSON.stringify(User.schema.obj)}`})
}