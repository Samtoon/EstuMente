'use client'
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/navbar/Navbar";
import { SideMenu } from "../ui/SideMenu";
import { UiContext } from "@/context/ui/UiContext";
import { FC, ReactNode, useState } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function PsiLayout ({ children, title }:Props) {
  const [isMenuOpen, toggleSideMenu] = useState(false)
  return(
    <>
    <Head>
      <title>{title}</title>
    </Head>
    <UiContext.Provider value = {{isMenuOpen: isMenuOpen, toggleSideMenu: () => {toggleSideMenu(!isMenuOpen)}}}>
    <nav>
      <Navbar />{" "}
    </nav>

    <SideMenu />
    </UiContext.Provider>
    <main>
      <ToastContainer />
      {children}
    </main>
    <footer>{/* <Footer position={false} /> */}</footer>
  </>
  )
}
