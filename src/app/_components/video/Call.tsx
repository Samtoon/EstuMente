import { FC, useCallback, useEffect, useRef, useState } from "react";
// import { psiApi } from "../../axios-api";
import DailyIframe, { DailyCall } from "@daily-co/daily-js";
import { Box, IconButton } from "@mui/material";
import { useSession } from "next-auth/react";
import { Note } from "@mui/icons-material";
import { ThemeProvider } from "@emotion/react";
import { noteTheme } from "@/app/_themes/note-theme";
import NotesDrawer from "../notes/NotesDrawer";

interface Props {
  room: any;
  setRoom: any;
  appointmentId: string;
  refreshData: any;
  token: string;
}

export const Call: FC<Props> = ({
  room,
  setRoom,
  appointmentId,
  refreshData,
  token,
}) => {
  const handleUpdateChecking = async () => {
    // await psiApi.put("/appointments", { id: appointmentId });
  };
  const { data: session, status } = useSession();
  const callRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const [callFrame, setCallFrame] = useState<DailyCall | null>(null);

  const createAndJoinCall = useCallback(async () => {
    const oldCall = DailyIframe.getCallInstance();
    if (!oldCall) {
      console.log("Creando nuevo objeto call");
      const newCallFrame = DailyIframe.createFrame(callRef?.current, {
        iframeStyle: {
          height: "calc(100vh - 7px - 64px)",
          width: "100%",
          aspectRatio: "16 / 9",
          minHeight: "calc(100vh - 7px - 64px)",
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

      let participants;
      try {
        newCallFrame
          .join({ url: room, token: token })
          .then((value) => console.log(value))
          .catch((reason) => console.log(reason))
          .catch((error) => console.log(error));
      } catch (error) {
        // console.log("Falló esa mierda, esto dice:");
        console.log(error);
      }
      // handleUpdateChecking();

      const leaveCall = async () => {
        // console.log("Se llama leaveCall");
        if (callFrame) await callFrame.destroy();
        setRoom(null);
        setCallFrame(null);
        // refreshData();
      };

      newCallFrame.on("left-meeting", leaveCall);
      // console.log("Termina el ciclo");
    } else {
      // console.log("Sí existe el bicho");
      await oldCall.destroy();
      // console.log("Destruido");
      createAndJoinCall();
    }
  }, [session, callFrame, room, token, setCallFrame, setRoom]);

  /**
   * Initiate Daily iframe creation on component render if it doesn't already exist
   */
  useEffect(() => {
    console.log("callFrame en Call es: " + callFrame);
    if (status === "authenticated" && !callFrame && room) {
      // console.log("callFrame no existe: " + callFrame);
      // console.log("username es:" + session?.user.firstName);
      createAndJoinCall();
      // console.log("Ya hice lo mío");
    }
  }, [callFrame, createAndJoinCall, session, status, room]);

  return (
    <Box>
      <Box>
        {/* Daily iframe container */}
        <div ref={callRef} className="video">
          {session?.psychologist && (
            <>
              <ThemeProvider theme={noteTheme}>
                <IconButton
                  disabled={open}
                  color="primary"
                  id="button-notes"
                  size="large"
                  onClick={() => setOpen(true)}
                >
                  <Note />
                </IconButton>
              </ThemeProvider>
              <NotesDrawer open={open} handleClose={() => setOpen(false)} />
            </>
          )}
        </div>
      </Box>
    </Box>
  );
};
