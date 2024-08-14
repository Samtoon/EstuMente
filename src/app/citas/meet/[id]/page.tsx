import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import PatientLayout from "@/app/_components/layout/PatientLayout";
import CallDisplay from "@/app/_components/video/CallDisplay";
import { getUpcomingAppointmentById } from "@/app/_database/daos/upcomingAppointmentDao";
import { requestToken } from "@/app/_utils/server actions/other";
import { NextPage } from "next";
import { getServerSession } from "next-auth";
import Roles from "@/app/_enums/Roles";

const prueba = "https://estumente.daily.co/prueba";

interface Props {
  params: { id: string };
}

const MeetPage: NextPage<Props> = async ({ params }) => {
  // const router = useRouter();
  const appointment = await getUpcomingAppointmentById(params.id);
  console.log("El appointment que recibo es:");
  console.log(appointment);
  const session = await getServerSession(authOptions);
  console.log("Y esta es la session");
  console.log(session?.user);
  // console.log(`comparando los ids ${session?.user._id} y ${appointment?.user}, el resultado es ${session?.user._id == appointment?.user}
  // y sus tipos son ${typeof session?.user._id} y ${typeof appointment?.user}`);
  function canJoin() {
    switch (session?.user.role) {
      case Roles.Consultante:
        return session.user._id === appointment?.patient;
      case Roles.Practicante:
        return session.psychologist?._id === appointment?.psychologist;
      default:
        return true;
    }
  }
  const token = canJoin() ? await requestToken(appointment?.roomName!) : "";
  return (
    <PatientLayout title="Sesión" pageDescription="Sesión iniciada">
      <CallDisplay appointment={appointment} token={token!} />
    </PatientLayout>
  );
};

export default MeetPage;
