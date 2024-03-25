import React, { useContext } from "react";
import { UiContext } from "@/contexts/ui/UiContext";
import { Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import {
  AccountCircleOutlined,
  DateRangeOutlined,
  HistoryOutlined,
  KeyOutlined,
  ScheduleOutlined,
  SupervisedUserCircleOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import MenuItem from "../MenuItem";

export default function ListPatient() {
  return (
    <List>
      <MenuItem label="Perfil" path="/perfil">
        <AccountCircleOutlined color="secondary" />
      </MenuItem>
      <MenuItem label="Citas pendientes" path="/app/citas">
        <DateRangeOutlined color="secondary" />
      </MenuItem>
      <MenuItem label="Historial de citas" path="/app/citas/historial">
        <HistoryOutlined color="secondary" />
      </MenuItem>
      <MenuItem label="Agendar una cita" path="/psicologos">
        <ScheduleOutlined color="secondary" />
      </MenuItem>
    </List>
  );
};
