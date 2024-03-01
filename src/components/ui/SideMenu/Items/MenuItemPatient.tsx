import React, { useContext } from "react";
import { UiContext } from "@/contexts/ui/UiContext";
import { Divider, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import {
  AccountCircleOutlined,
  DateRangeOutlined,
  HistoryOutlined,
  KeyOutlined,
  SupervisedUserCircleOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

export const MenuItemPatient = () => {
  const router = useRouter();
  const { toggleSideMenu } = useContext(UiContext);

  const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url);
  };
  return (
    <>
      <ListItem button onClick={() => navigateTo("/app/perfil")}>
        <ListItemIcon>
          <AccountCircleOutlined color="secondary" />
        </ListItemIcon>
        <ListItemText primary={"Perfil"} />
      </ListItem>

      <ListItem button onClick={() => navigateTo("/app/citas")}>
        <ListItemIcon>
          <DateRangeOutlined color="secondary" />
        </ListItemIcon>
        <ListItemText primary={"Mis citas"} />
      </ListItem>

      <ListItem button onClick={() => navigateTo("/app/citas/historial")}>
        <ListItemIcon>
          <HistoryOutlined color="secondary" />
        </ListItemIcon>
        <ListItemText primary={"Historial de citas"} />
      </ListItem>

      <ListItem button onClick={() => navigateTo("/psicologos")}>
        <ListItemIcon>
          <SupervisedUserCircleOutlined color="secondary" />
        </ListItemIcon>
        <ListItemText primary={"Psicólogos"} />
      </ListItem>

      <Divider />

      <ListItem
        button
        onClick={() => navigateTo("/autenticacion/cambiar-password")}
      >
        <ListItemIcon>
          <KeyOutlined color="secondary" />
        </ListItemIcon>
        <ListItemText primary={"Cambiar contraseña"} />
      </ListItem>
    </>
  );
};
