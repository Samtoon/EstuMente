import { useContext } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box/Box";
import Divider from "@mui/material/Divider/Divider";
import Drawer from "@mui/material/Drawer/Drawer";
import List from "@mui/material/List/List";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import ListItem from "@mui/material/ListItem";
import NextLink from "next/link";
import {
  ListItemButton,
  ListSubheader,
} from "@mui/material";
import {
  AccountCircleOutlined,
  LoginOutlined,
  LogoutOutlined,
  SupervisedUserCircleOutlined,
} from "@mui/icons-material";
import { UiContext } from "../../../contexts/ui/UiContext";
import { useSession } from "next-auth/react";
import { MenuItemPsychologist } from "./Items/MenuItemPsychologist";
import { MenuItemPatient } from "./Items/MenuItemPatient";
/*import { MenuItemPsychologist } from "./MenuItemPsychologist";
import { MenuItemPatient } from "./MenuItemPatient";
import { MenuItemAdmin } from "./MenuItemAdmin"; */

export const SideMenu = () => {
/*   const router = useRouter();
  const { isMenuOpen, toogleSideMenu } = useContext(UiContext);
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  const navigateTo = (url: string) => {
    toogleSideMenu();
    router.push(url);
  }; */
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
  const { data: session, status } = useSession();

  return (
    <Drawer
      open={isMenuOpen}
      anchor="right"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
      onClose={toggleSideMenu}  
    >
      <Box sx={{ width: 250 }}>
        <List>
          
          {session && session.user?.role === "Consultante" && (
            /* Paciente */
            <MenuItemPatient />
          )}

          {session && session.user?.role === "Practicante" && (
            /* Psicólogo */
            <MenuItemPsychologist />
          )}

          {!true ? (
            /* Genérico */
            <ListItem button>
              <ListItemIcon>
                <LogoutOutlined color="secondary" />
              </ListItemIcon>
              <ListItemText primary={"Salir"} />
            </ListItem>
          ) : (
            <>
              
              <ListItemButton
                
                component={NextLink}
                href="/login"
                /* onClick={() =>
                  navigateTo(`/autenticacion/login?p=${router.asPath}`)
                } */
              >
                <ListItemIcon>
                  <LoginOutlined color="secondary" />
                </ListItemIcon>
                <ListItemText primary={"Iniciar sesión"} />
              </ListItemButton>
              
              <ListItem button /* onClick={() => navigateTo("/psicologos")} */>
                <ListItemIcon>
                  <SupervisedUserCircleOutlined color="secondary" />
                </ListItemIcon>
                <ListItemText primary={"Psicólogos"} />
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );
};