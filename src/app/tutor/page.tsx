import TestLayout from "@/app/_components/layout/TestLayout";
import { getServerSession } from "next-auth";
import IUser from "@/app/_interfaces/IUser";
import { AuthLayout } from "@/app/_components/layout/AuthLayout";

export default async function HomePageConsultante() {
    return (
        <AuthLayout title="Tutor">
            <TestLayout title="Tutor"/>
        </AuthLayout>
    )
}