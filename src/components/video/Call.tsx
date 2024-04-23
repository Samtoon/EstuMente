import { FC, useCallback, useEffect, useRef } from "react";
// import { psiApi } from "../../axios-api";
import DailyIframe from "@daily-co/daily-js";
import { Box } from "@mui/material";

interface Props {
  room: any;
  setRoom: any;
  callFrame: any;
  setCallFrame: any;
  userName: string;
  appointmentId: string;
  refreshData: any;
}

export const Call: FC<Props> = ({
  room,
  setRoom,
  callFrame,
  setCallFrame,
  userName,
  appointmentId,
  refreshData,
}) => {
  const handleUpdateChecking = async () => {
    // await psiApi.put("/appointments", { id: appointmentId });
  };

  const callRef = useRef<any>(null);

  const createAndJoinCall = useCallback(async () => {
    console.log("Creando nuevo objeto call");
    try {
      const oldCall = DailyIframe.getCallInstance();
      if (oldCall) {
        // console.log("Sí existe el bicho");
        await oldCall.destroy();
      }
      
    } catch (error) {
      console.log("Hubo un error: " + error);
    }
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
      userName: userName,
      showLeaveButton: true,
      showFullscreenButton: true,
    });
    console.log("callFrame Creado, es: " + newCallFrame);
    setCallFrame(newCallFrame);

    newCallFrame.join({ url: room });
    console.log("Me uno");
    // handleUpdateChecking();

    const leaveCall = () => {
      console.log("Se llama leaveCall");
      setRoom(null);
      setCallFrame(null);
      refreshData();
      callFrame.destroy();
    };

    newCallFrame.on("left-meeting", leaveCall);
    console.log("Termina el ciclo");
  }, [room, setCallFrame]);

  /**
   * Initiate Daily iframe creation on component render if it doesn't already exist
   */
  useEffect(() => {
    console.log("callFrame es: " + callFrame);
    if (callFrame) return;
    console.log("callFrame no existe: " + callFrame);
    createAndJoinCall();
    console.log("Ya hice lo mío");
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
