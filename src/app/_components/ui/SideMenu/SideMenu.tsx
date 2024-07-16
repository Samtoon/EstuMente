import { useContext } from "react";
import Box from "@mui/material/Box/Box";
import Divider from "@mui/material/Divider/Divider";
import Drawer from "@mui/material/Drawer/Drawer";
import List from "@mui/material/List/List";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import ListItem from "@mui/material/ListItem";
import NextLink from "next/link";
import {
  Avatar,
  ListItemAvatar,
  ListItemButton
} from "@mui/material";
import {
  Build,
  LoginOutlined,
  LogoutOutlined,
  SupervisedUserCircleOutlined,
} from "@mui/icons-material";
import { UiContext } from "../../../_contexts/ui/UiContext";
import { signIn, signOut, useSession } from "next-auth/react";
import ListPsychologist from "./Lists/ListPsychologist";
import ListPatient from "./Lists/ListPatient";
import ListAdmin from "./Lists/ListAdmin";
import ListCoordinator from "./Lists/ListCoordinator";
import ListTutor from "./Lists/ListTutor";
import MenuItem from "./MenuItem";
import Roles from "@/app/_enums/Roles";
/*import { MenuItemPsychologist } from "./MenuItemPsychologist";
import { ListPatient } from "./ListPatient";
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
  const role = session?.user.role;

  return (
    <Drawer
      open={isMenuOpen}
      anchor="right"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
      onClose={toggleSideMenu}
    >
      <Box sx={{ width: 250 }}>

        {session && (
          <div>
            <List>
              <ListItem>
                <ListItemText primary={"Hola, " + session.user.firstName} />
                <ListItemAvatar>
                  <Avatar src={session.user.profilePicture?.url!} slotProps={{img: {referrerPolicy:"no-referrer"}}}/>
                </ListItemAvatar>
              </ListItem>
            </List>
            <Divider />
          </div>
        )}

        {role === Roles.Consultante && (
          /* Paciente */
          <ListPatient />
        )}

        {role === Roles.Practicante && (
          /* Psicólogo */
          <ListPsychologist />
        )}

        {role === Roles.Tutor && (
          /* Tutor */
          <ListTutor />
        )}

        {role === Roles.Coordinador && (
          /* Coordinador */
          <ListCoordinator />
        )}

        {role === Roles.Administrador && (
          /* Administrador */
          <ListAdmin />
        )}

        {session ? (
          /* Genérico */
          <div>
            <Divider />
            <List>
              <ListItemButton onClick={() => signOut({ callbackUrl: "/" })}>
                <ListItemIcon>
                  <LogoutOutlined color="secondary" />
                </ListItemIcon>
                <ListItemText primary={"Salir"} />
              </ListItemButton>
            </List>
          </div>
        ) : (
          <List>
            <ListItemButton
              onClick={() => signIn("google")}
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
          </List>
        )}
        <MenuItem label="Pruebas" path="/pruebas">
          <Build color="secondary"/>
        </MenuItem>
      </Box>
    </Drawer>
  );
};