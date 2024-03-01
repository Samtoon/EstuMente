import React, { useContext } from "react";
import {
  AccountCircleOutlined,
  CreditCardOutlined,
  DateRangeOutlined,
  HistoryToggleOffOutlined,
  KeyOutlined,
  SchoolOutlined,
  SupervisedUserCircleOutlined,
} from "@mui/icons-material";
import { Divider, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { UiContext } from "@/contexts/ui/UiContext";
import { useRouter } from "next/navigation";

export const MenuItemPsychologist = () => {
  const router = useRouter();
  const { toggleSideMenu } = useContext(UiContext);

  const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url);
  };

  return (
    <>
      <ListItem button onClick={() => navigateTo("/psicologo/perfil")}>
        <ListItemIcon>
          <AccountCircleOutlined color="secondary" />
        </ListItemIcon>
        <ListItemText primary={"Perfil"} />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <SchoolOutlined color="secondary" />
        </ListItemIcon>
        <ListItemText primary={"Perfil profesional"} />
      </ListItem>

      <ListItem
        button
        onClick={() => navigateTo("/psicologo/agenda/configurar")}
      >
        <ListItemIcon>
          <HistoryToggleOffOutlined color="secondary" />
        </ListItemIcon>
        <ListItemText primary={"Configurar agenda"} />
      </ListItem>

      <ListItem button onClick={() => navigateTo("/psicologo/sesiones")}>
        <ListItemIcon>
          <DateRangeOutlined color="secondary" />
        </ListItemIcon>
        <ListItemText primary={"Sesiones"} />
      </ListItem>

      <ListItem button onClick={() => navigateTo("/psicologo/pacientes")}>
        <ListItemIcon>
          <SupervisedUserCircleOutlined color="secondary" />
        </ListItemIcon>
        <ListItemText primary={"Mis pacientes"} />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <CreditCardOutlined color="secondary" />
        </ListItemIcon>
        <ListItemText primary={"Mis pagos"} />
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
