'use client'
import { useContext } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box/Box";
import Divider from "@mui/material/Divider/Divider";
import Drawer from "@mui/material/Drawer/Drawer";
import List from "@mui/material/List/List";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import ListItem from "@mui/material/ListItem/ListItem";
import {
  ListSubheader,
} from "@mui/material";
import {
  AccountCircleOutlined,
  LoginOutlined,
  LogoutOutlined,
  SupervisedUserCircleOutlined,
} from "@mui/icons-material";
import { UiContext } from "../../context/ui/UiContext";
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

  return (
    <Drawer
      open={isMenuOpen}
      anchor="right"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
      onClose={toggleSideMenu}  
    >
      <Box sx={{ width: 250 }}>
        <List>
          


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
              <ListItem
                button
                /* onClick={() =>
                  navigateTo(`/autenticacion/login?p=${router.asPath}`)
                } */
              >
                <ListItemIcon>
                  <LoginOutlined color="secondary" />
                </ListItemIcon>
                <ListItemText primary={"Iniciar sesión"} />
              </ListItem>
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