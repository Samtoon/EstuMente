import { AuthLayout } from "@/app/_components/layout/AuthLayout";
import TestLayout from "@/app/_components/layout/TestLayout";

export default function HomePageConsultante() {
  return (
    <AuthLayout title="Administrador">
      <TestLayout title="Administrador" />
    </AuthLayout>
  );
}
