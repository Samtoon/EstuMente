"use client";
import {
  AppBar,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Divider,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { UiContext } from "@/app/_contexts/ui/UiContext";
import { useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, NotificationsNoneOutlined } from "@mui/icons-material";
import NotificationsButton from "./notifications/NotificationsButton";
import Roles from "@/app/_enums/Roles";
import { SideMenu } from "../ui/SideMenu/SideMenu";
import { SessionTimeContext } from "@/app/_contexts/SessionTimeContext";
import { registerSessionTime } from "@/app/_utils/session-time";
import BreadcrumbsSection from "./BreadcrumbsSection";

const Navbar = () => {
  console.log("Se renderiza Navbar");
  const pathname = usePathname();
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
  const { sessionTime, setSessionTime } = useContext(SessionTimeContext);
  const { data: session, status, update } = useSession();
  console.log("Session es:", session);
  useEffect(() => {
    if (session) {
      console.log("useEffect por primera vez, sessionTime es:", sessionTime);

      if (sessionTime) {
        const handleEvent = (ev: Event) => {
          if (document.visibilityState === "hidden") {
            registerSessionTime(sessionTime, session.user._id!);
          } else {
            setSessionTime(new Date());
            console.log("Me cumplo");
            update();
          }
        };

        document.addEventListener("visibilitychange", handleEvent);
        return () => {
          document.removeEventListener("visibilitychange", handleEvent);
        };
      }
    }
  }, [session, setSessionTime, sessionTime, update]);
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
          <NextLink href="/practicantes" passHref>
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
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box>
            <Link
              variant="h6"
              sx={{ ml: 0.5 }}
              color="secondary.contrastText"
              href="/"
              underline="none"
            >
              Acompañamiento Psicológico
            </Link>
          </Box>
          <Box sx={{ display: "flex", minHeight: "inherit" }}>
            <Divider
              orientation="vertical"
              sx={{
                minHeight: "inherit",
                border: "2px solid white",
                height: "inherit",
              }}
            />
            {session ? (
              <>
                <NotificationsButton />
                <Divider
                  orientation="vertical"
                  sx={{
                    minHeight: "inherit",
                    border: "2px solid white",
                    height: "inherit",
                  }}
                />
                <Button
                  onClick={toggleSideMenu}
                  variant="text"
                  color="contrast"
                  sx={{
                    minHeight: "inherit",
                    borderRadius: "0px",
                    minWidth: "100px",
                    maxWidth: "10%",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  Menú
                </Button>
                <IconButton
                  color="contrast"
                  onClick={toggleSideMenu}
                  sx={{
                    minHeight: "inherit",
                    borderRadius: "0px",
                    aspectRatio: 1,
                    "& .MuiTouchRipple-root .MuiTouchRipple-child": {
                      borderRadius: "0px",
                      minHeight: "inherit",
                    },
                    display: { xs: "block", sm: "none" },
                  }}
                >
                  <Menu />
                </IconButton>
              </>
            ) : (
              <Box
                sx={{
                  display: { minHeight: "inherit" },
                }}
              >
                <Button
                  variant="text"
                  className="hero-btn"
                  onClick={() => signIn("google")}
                  color="contrast"
                  sx={{
                    borderRadius: "0px",
                    minWidth: "100px",
                    maxWidth: "10%",
                    minHeight: "inherit",
                  }}
                >
                  Iniciar sesión
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {pathname !== "/" && (
        <>
          <Toolbar />
          <BreadcrumbsSection />
        </>
      )}

      <SideMenu />
    </>
  );
};

export default Navbar;
