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

const Navbar = () => {
  console.log("Se renderiza Navbar");
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
  const { data: session, status } = useSession();

  function middleButton(): JSX.Element {
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
        return <Button variant="text">Caso default en middleButton</Button>;
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