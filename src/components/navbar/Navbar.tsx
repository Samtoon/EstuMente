'use client'
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { UiContext } from "@/contexts/ui/UiContext";
import { useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import { getSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation"


const Navbar = () => {
  const {isMenuOpen ,toggleSideMenu} = useContext(UiContext);
  const router = useRouter();
    async function recurrente() {
        const session = await getSession();
        if (session) {
            router.push("/".concat(session.user.role!.toLocaleLowerCase()));
        }
    }
    useEffect(() => {
        console.log("hola");
        recurrente();
    })
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
            
            <Button variant="contained" color="secondary" className="hero-btn" onClick={() => signIn("google")}>
                Iniciar sesión
            </Button>
            
              
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
