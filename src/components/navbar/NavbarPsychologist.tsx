import React, { useContext } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { NotificationsNoneOutlined } from "@mui/icons-material";
import { /*AuthContext,*/ UiContext } from "../../contexts/ui/UiContext";
import { signOut } from "next-auth/react";

const logo = "/images/logo.png";

export const NavbarPsychologist = () => {
  const { toggleSideMenu } = useContext(UiContext);

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" onClick={() => signOut({redirect: false})}passHref>
          {/* <Link display="flex" alignItems="center"> */}
            {/* <Image src={`${logo}`} alt="logo" width={40} height={40} /> */}
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
          {/* </Link> */}
        </NextLink>

        <Box flex={1} />

        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <NextLink href="/psicologo/pacientes" passHref>
            <Button variant="text">Mis pacientes</Button>
          </NextLink>
        </Box>

        <Box flex={1} />

        <NextLink href="/psicologo/notificaciones/vacio" passHref>
          {/* <Link> */}
            <IconButton color="info">
              <Badge badgeContent={2} color="secondary" sx={{ m: 1 }}>
                <NotificationsNoneOutlined />
              </Badge>
            </IconButton>
          {/* </Link> */}
        </NextLink>

        <Button onClick={toggleSideMenu} variant="text">
          Menú
        </Button>
      </Toolbar>
    </AppBar>
  );
};
