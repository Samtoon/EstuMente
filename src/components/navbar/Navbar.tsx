'use client'
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { UiContext } from "@/context/ui/UiContext";
import { useContext, useState } from "react";
import NextLink from "next/link";


const Navbar = () => {
  const {isMenuOpen ,toggleSideMenu} = useContext(UiContext);
  const handleButtonClick = () => {
    toggleSideMenu();
    
  }
  return (

    <AppBar>
      <Toolbar>
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
        <Box flex={1} />
        {!false && (
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Button variant="text">Psicólogos</Button>
          </Box>
        )}
        <Box flex={1} />
        {!false && (
          <Box sx={{ display: { xs: "none", sm: "block" }, m: 1 }}>
            <NextLink href="/login">
            <Button variant="contained" color="secondary" className="hero-btn">
                Iniciar sesión
              </Button>
            </NextLink>
              
          </Box>
        )}
        <Button onClick={handleButtonClick} variant="text">
          Menú
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;
