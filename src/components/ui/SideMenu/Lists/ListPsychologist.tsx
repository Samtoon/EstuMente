import React, { useContext } from "react";
import {
  AccountCircleOutlined,
  CreditCardOutlined,
  DateRangeOutlined,
  EditCalendar,
  HistoryOutlined,
  HistoryToggleOffOutlined,
  KeyOutlined,
  SchoolOutlined,
  SupervisedUserCircleOutlined,
} from "@mui/icons-material";
import { Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { UiContext } from "@/contexts/ui/UiContext";
import { useRouter } from "next/navigation";
import MenuItem from "../MenuItem";

export default function ListPsychologist() {
  return (
    <List>
      <MenuItem label="Perfil" path="/perfil">
        <AccountCircleOutlined color="secondary" />
      </MenuItem>
      <MenuItem label="Configurar agenda" path="/agenda">
        <EditCalendar color="secondary" />
      </MenuItem>
      <MenuItem label="Citas pendientes" path="/citas">
        <DateRangeOutlined color="secondary" />
      </MenuItem>
      <MenuItem label="Historial de citas" path="/psicologo/sesiones">
        <HistoryOutlined color="secondary" />
      </MenuItem>
      <MenuItem label="Mis pacientes" path="/psicologo/pacientes">
        <SupervisedUserCircleOutlined color="secondary" />
      </MenuItem>
    </List>
  );
};
