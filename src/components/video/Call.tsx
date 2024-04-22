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

  const createAndJoinCall = useCallback(() => {
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

    setCallFrame(newCallFrame);

    newCallFrame.join({ url: room });

    handleUpdateChecking();

    const leaveCall = () => {
      setRoom(null);
      setCallFrame(null);
      refreshData();
      callFrame.destroy();
    };

    newCallFrame.on("left-meeting", leaveCall);
  }, [room, setCallFrame]);

  /**
   * Initiate Daily iframe creation on component render if it doesn't already exist
   */
  useEffect(() => {
    if (callFrame) return;
    createAndJoinCall();
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
