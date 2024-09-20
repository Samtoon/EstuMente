import React, { FC } from "react";
import NextLink from "next/link";
import { Typography, Box, Link, Button, Stack } from "@mui/material";
import { VideocamOffOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Props {
  joinTrigger: () => void;
  leaveTrigger: () => void;
}

export const EndCall: FC<Props> = ({ joinTrigger, leaveTrigger }) => {
  // const {data: session} = useSession();
  const router = useRouter();
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 67px)"
        flexDirection="column"
        minHeight="calc(100vh - 67px)"
        className="fadeIn"
      >
        <VideocamOffOutlined sx={{ fontSize: 300 }} color="secondary" />
        <Stack spacing={2}>
          <Typography align="center" color="text1" gutterBottom>
            Has salido de la cita antes de finalizar el tiempo
          </Typography>

          <Button
            color="secondary"
            className="card-btn"
            onClick={() => {
              console.log("Click!");
              joinTrigger!();
              // router.refresh();
            }}
          >
            Volver a ingresar
          </Button>
          <Button
            color="secondary"
            className="card-btn"
            onClick={() => {
              console.log("Click!");
              leaveTrigger();
              // router.refresh();
            }}
          >
            Calificar la cita y salir
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
