import TestLayout from "@/components/layout/TestLayout";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import IUser from "@/interfaces/IUser";
import { AuthLayout } from "@/components/layout/AuthLayout";

export default async function HomePageConsultante() {
    return (
        <AuthLayout title="Tutor">
            <TestLayout title="Tutor"/>
        </AuthLayout>
    )
}