import { Box, AppBar, Toolbar, Link, Typography } from "@mui/material";
import Head from "next/head";
import NextLink from "next/link";
import React, { FC } from "react";
//import { NavbarSingle } from "../navbar";
//import { Footer } from "../ui";
import { ToastContainer } from "react-toastify";
import Image from "next/image";

import "react-toastify/dist/ReactToastify.css";

interface Props {
  title: string;
  children: any;
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <nav>
      <AppBar>
      <Toolbar>
        {/* <NextLink href="/" passHref> */}
          <Link component={NextLink} href="/" display="flex" alignItems="center">
            {/* <Image src={`${logo}`} alt="logo" width={40} height={40} /> */}
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography
                variant="h6"
                component="h6"
                sx={{ ml: 0.5 }}
                color="white"
              >
                PsicológicaMente
              </Typography>
            </Box>
          </Link>
        {/* </NextLink> */}

        <Box flex={1} />
      </Toolbar>
    </AppBar>
      </nav>

      <main>
        <ToastContainer />

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            height: { xs: "auto", sm: "calc(100vh - 100px)" },
            m: { xs: "5rem 0rem", sm: "1rem 0rem" },
          }}
        >
          {children}
        </Box>
      </main>
      <footer>{/* <Footer position={false} /> */}</footer>
    </>
  );
};
