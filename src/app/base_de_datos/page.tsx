import PageHeader from "../_components/PageHeader";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import IUser from "../_interfaces/IUser";
import { esES } from "@mui/x-data-grid/locales/esES";
import { getUsers } from "../_database/daos/userDao";
import UsersDataGrid from "../_components/dbManagement/UsersDataGrid";
import { serialize } from "../_database/connection";

const defaultRow = {
  Apellidos: "",
  Nombres: "",
  Correo: "",
  Rol: "",
  Estado: "",
};

type IRow = typeof defaultRow;

export default async function Page() {
  const users = await getUsers();
  const columns: GridColDef[] = Object.keys(defaultRow).map((key) => ({
    field: key,
    flex: 1,
  }));
  const rows = users.map((user, index) => ({
    id: index,
    Apellidos: user.lastName,
    Nombres: user.firstName,
    Correo: user.email,
    Rol: user.role,
    Estado: user.state,
  }));
  return (
    <>
      <PageHeader header="Gestión de la Base de Datos" />
      <UsersDataGrid users={serialize(users) as IUser[]} />
    </>
  );
}
