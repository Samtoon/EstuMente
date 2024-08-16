import PageHeader from "../_components/PageHeader";
import TutorsDataGrid from "../_components/tutors/TutorsDataGrid";
import { getAssignedUsersById } from "../_database/daos/userDao";
import { getMyServerSession } from "../_utils/next-auth";

export default async function HomePageConsultante() {
  const session = await getMyServerSession();
  const assignedUsers = await getAssignedUsersById(session?.user._id!);
  return (
    <>
      <PageHeader header="Mis Tutores" />
      <TutorsDataGrid tutors={assignedUsers} />
    </>
  );
}
