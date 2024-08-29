<<<<<<< HEAD
"use client";
=======
'use client'
>>>>>>> 8eea2ccdbe020cb45315b20374ed9dc1acc12758
import React, { FC, ReactNode, useState } from "react";
import Head from "next/head";
import { SideMenu } from "../ui/SideMenu/SideMenu";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { UiContext } from "@/app/_contexts/ui/UiContext";

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  children: ReactNode;
}

const PatientLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}) => {
<<<<<<< HEAD
  const [isMenuOpen, toggleSideMenu] = useState(false);
=======
  const [isMenuOpen, toggleSideMenu] = useState(false)
>>>>>>> 8eea2ccdbe020cb45315b20374ed9dc1acc12758
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {/* <UiContext.Provider value = {{isMenuOpen: isMenuOpen, toggleSideMenu: () => {toggleSideMenu(!isMenuOpen)}}}> */}
<<<<<<< HEAD

      {/* <NavbarPatient /> */}
=======
      
        {/* <NavbarPatient /> */}
      
>>>>>>> 8eea2ccdbe020cb45315b20374ed9dc1acc12758

      {/* <SideMenu /> */}
      {/* </UiContext.Provider> */}

      <main>
<<<<<<< HEAD
        {/* <ToastContainer /> */}
=======
        <ToastContainer />
>>>>>>> 8eea2ccdbe020cb45315b20374ed9dc1acc12758
        {children}
      </main>
    </>
  );
};

export default PatientLayout;
