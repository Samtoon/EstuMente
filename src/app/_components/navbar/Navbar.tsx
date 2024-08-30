"use client";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { UiContext } from "@/app/_contexts/ui/UiContext";
import { useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { NotificationsNoneOutlined } from "@mui/icons-material";
import NotificationsButton from "./notifications/NotificationsButton";
import Roles from "@/app/_enums/Roles";
import { SideMenu } from "../ui/SideMenu/SideMenu";
import { SessionTimeContext } from "@/app/_contexts/SessionTimeContext";
import { registerSessionTime } from "@/app/_utils/session-time";

const Navbar = () => {
  console.log("Se renderiza Navbar");

  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
  const { sessionTime, setSessionTime } = useContext(SessionTimeContext);
  const { data: session, status } = useSession();
  useEffect(() => {
    if (session) {
      console.log("useEffect por primera vez, sessionTime es:", sessionTime);

      if (sessionTime) {
        const handleEvent = (ev: Event) => {
          if (document.visibilityState === "hidden") {
            registerSessionTime(sessionTime, session.user._id!);
          } else {
            setSessionTime(new Date());
          }
        };

        document.addEventListener("visibilitychange", handleEvent);
        return () => {
          document.removeEventListener("visibilitychange", handleEvent);
        };
      }
    }
  }, [session, setSessionTime, sessionTime]);
  useEffect(() => {
    if (session) {
      setSessionTime(new Date());
      console.log("2do useEffect");
    }
  }, [session, setSessionTime]);
  function middleButton() {
    switch (session?.user.role) {
      case undefined:
      case Roles.Consultante:
        return (
          <NextLink href="/psicologos" passHref>
            <Button variant="text">Psicólogos</Button>
          </NextLink>
        );
      case Roles.Practicante:
        return (
          <NextLink href="/consultantes" passHref>
            <Button variant="text">Mis pacientes</Button>
          </NextLink>
        );
      default:
        return null;
    }
  }

  return (
    <>
      <AppBar>
        <Toolbar>
          <NextLink href="/" passHref>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography
                variant="h6"
                component="h6"
                sx={{ ml: 0.5 }}
                color="white"
              >
                EstuMente
              </Typography>
            </Box>
          </NextLink>
          <Box flex={1} />
          {middleButton()}
          <Box flex={1} />
          {session ? (
            <NotificationsButton />
          ) : (
            <Box sx={{ display: { xs: "none", sm: "block" }, m: 1 }}>
              <Button
                variant="contained"
                color="secondary"
                className="hero-btn"
                onClick={() => signIn("google")}
              >
                Iniciar sesión
              </Button>
            </Box>
          )}
          <Button onClick={toggleSideMenu} variant="text">
            Menú
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <SideMenu />
    </>
  );
};

export default Navbar;
