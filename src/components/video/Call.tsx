import { FC, useCallback, useEffect, useRef } from "react";
// import { psiApi } from "../../axios-api";
import DailyIframe from "@daily-co/daily-js";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";

interface Props {
  room: any;
  setRoom: any;
  callFrame: any;
  setCallFrame: any;
  appointmentId: string;
  refreshData: any;
}

export const Call: FC<Props> = ({
  room,
  setRoom,
  callFrame,
  setCallFrame,
  appointmentId,
  refreshData,
}) => {
  const handleUpdateChecking = async () => {
    // await psiApi.put("/appointments", { id: appointmentId });
  };
  const {data: session, status} = useSession();
  const callRef = useRef<any>(null);

  const createAndJoinCall = async () => {
    const oldCall = DailyIframe.getCallInstance();
    if(!oldCall) {
      console.log("Creando nuevo objeto call");
      const newCallFrame = DailyIframe.createFrame(callRef?.current, {
        iframeStyle: {
          height: "calc(100vh - 67px)",
          width: "100%",
          aspectRatio: "16 / 9",
          minHeight: "calc(100vh - 67px)",
          border: "0",
        },
        theme: {
          colors: {
            accent: "#4D22B3",
            accentText: "#FFFFFF",
            background: "#1F1D36",
            backgroundAccent: "#311673",
            baseText: "#FFFFFF",
            border: "#574770",
            mainAreaBg: "#000000",
            mainAreaBgAccent: "#333333",
            mainAreaText: "#FFFFFF",
            supportiveText: "#808080",
          },
        },
        userName: session?.user.firstName!,
        showLeaveButton: true,
        showFullscreenButton: false,
      });
      console.log("callFrame Creado, es: " + newCallFrame);
      setCallFrame(newCallFrame);
  
      newCallFrame.join({ url: room });
      console.log("Me uno");
      // handleUpdateChecking();
  
      const leaveCall = () => {
        console.log("Se llama leaveCall");
        setRoom(null);
        setCallFrame(undefined);
        refreshData();
        callFrame.destroy();
      };
  
      newCallFrame.on("left-meeting", leaveCall);
      console.log("Termina el ciclo");
    } else {
        console.log("Sí existe el bicho");
        await oldCall.destroy();
        console.log("Destruido");
    }
  }

  /**
   * Initiate Daily iframe creation on component render if it doesn't already exist
   */
  useEffect(() => {
    // console.log("callFrame es: " + callFrame);
    if (status === "authenticated" && !callFrame) {
    // console.log("callFrame no existe: " + callFrame);
    console.log("username es:" + session?.user.firstName);
    createAndJoinCall();
    console.log("Ya hice lo mío");
    }
  }, [callFrame, createAndJoinCall]);

  return (
    <Box>
      <Box>
        {/* Daily iframe container */}
        <div ref={callRef} className="video" />
      </Box>
    </Box>
  );
};
