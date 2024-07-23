import { useSession } from "next-auth/react";
import ProfileField from "./ProfileField";
import Roles from "@/app/_enums/Roles";
import IUser from "@/app/_interfaces/IUser";
import { Grid } from "@mui/material";
import { format, parse } from "date-fns";
import { es } from "date-fns/locale";

export default function FieldForm({
  setUpdating,
}: {
  setUpdating: (value: boolean) => void;
}) {
  const { data: session, update } = useSession();
  const user = session?.user;
  function handleSubmit(formData: FormData) {
    const dateParts = formData
      .get("Fecha de Nacimiento")
      ?.toString()
      .split("/")
      .map((part) => Number(part))!;
    const updatedUser: Partial<IUser> = {
      firstName: formData.get("Nombres")?.toString(),
      lastName: formData.get("Apellidos")?.toString(),
      fullName: `${formData.get("Nombres")?.toString()} ${formData
        .get("Apellidos")
        ?.toString()}`,
      dateOfBirth: new Date(dateParts[2], dateParts[1] - 1, dateParts[0]),
      career: formData.get("Carrera")?.toString(),
      semester: Number(formData.get("Semestre")),
      gender: formData.get("Género")?.toString(),
      phone: formData.get("Celular")?.toString(),
    };
    for (let key in updatedUser) {
      if (!updatedUser[key as keyof typeof updatedUser]) {
        console.log("entro");
        delete updatedUser[key as keyof typeof updatedUser];
      }
    }
    console.log(`La fecha es ${formData.get("Fecha de Nacimiento")}`);
    console.log("usuario actualizado:");
    console.log(updatedUser);
    update(updatedUser).then(() => setUpdating(false));
  }
  return (
    <form id="profileForm" action={handleSubmit}>
      <Grid container spacing={2}>
        <ProfileField
          label="Nombres"
          type="text"
          defaultValue={user?.firstName}
        />
        <ProfileField
          label="Apellidos"
          type="text"
          defaultValue={user?.lastName}
        />
        <ProfileField label="Celular" type="tel" defaultValue={user?.phone} />
        <ProfileField
          label="Género"
          type="special"
          defaultValue={user?.gender}
        />
        <ProfileField
          label="Fecha de Nacimiento"
          type="special"
          defaultValue={
            user?.dateOfBirth ? new Date(user.dateOfBirth) : undefined
          }
        />
        <ProfileField label="Correo" type="email" defaultValue={user?.email} />
        {user?.role === Roles.Consultante && (
          <ProfileField
            label="Carrera"
            type="special"
            defaultValue={user?.career}
          />
        )}
        {(user?.role === Roles.Consultante ||
          user?.role === Roles.Practicante) && (
          <ProfileField
            label="Semestre"
            type="number"
            defaultValue={user?.semester}
          />
        )}
        <ProfileField label="Rol" type="special" defaultValue={user?.role} />
      </Grid>
    </form>
  );
}
