import { AuthLayout } from "@/components/layout/AuthLayout";
import TestLayout from "@/components/layout/TestLayout";

export default function HomePageConsultante() {
    return (
        <AuthLayout title="Administrador">
            <TestLayout title="Administrador" />
        </AuthLayout>
    )
}