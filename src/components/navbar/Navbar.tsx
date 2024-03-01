'use client'
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { UiContext } from "@/contexts/ui/UiContext";
import { useContext, useState } from "react";
import NextLink from "next/link";
import { signOut } from "next-auth/react";


const Navbar = () => {
  const {isMenuOpen ,toggleSideMenu} = useContext(UiContext);
  return (

    <AppBar>
      <Toolbar>
      <NextLink href="/" onClick={() => signOut({redirect: false})} passHref>
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
        {!false && (
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Button variant="text">Psicólogos</Button>
          </Box>
        )}
        <Box flex={1} />
        {!false && (
          <Box sx={{ display: { xs: "none", sm: "block" }, m: 1 }}>
            <NextLink href="/loginRecurrente">
            <Button variant="contained" color="secondary" className="hero-btn">
                Iniciar sesión
              </Button>
            </NextLink>
              
          </Box>
        )}
        <Button onClick={toggleSideMenu} variant="text">
          Menú
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;
