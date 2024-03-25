import { List } from "@mui/material";
import MenuItem from "../MenuItem";
import { AccountCircleOutlined, FeedOutlined, SupervisorAccountOutlined, ThumbUpOutlined } from "@mui/icons-material";

export default function ListCoordinator() {
    return(
        <List>
            <MenuItem label="Perfil" path="/perfil">
                <AccountCircleOutlined color="secondary" />
            </MenuItem>
            <MenuItem label="Dar Aval" path="">
                <ThumbUpOutlined color="secondary" />
            </MenuItem>
            <MenuItem label="Mis Tutores" path="">
                <SupervisorAccountOutlined color="secondary"/>
            </MenuItem>
            <MenuItem label="Practicantes" path="">
                <SupervisorAccountOutlined color="secondary"/>
            </MenuItem>
            <MenuItem label="Reportes" path="">
                <FeedOutlined color="secondary"/>
            </MenuItem>
        </List>
    )
}