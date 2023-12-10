import { createContext } from "react";

interface ContextProps {
  isMenuOpen: boolean;

  //Methods
  toggleSideMenu(): any;
}

export const UiContext = createContext({} as ContextProps);
