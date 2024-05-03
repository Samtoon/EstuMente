import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

export default function ListNotesPanel() {
    return (
        <h6 id="list-notes-panel">
            <List>
                {Array(4).fill(null).map(() =>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText primary="título" secondary="creado el ta ta tá" />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
        </h6>
    )
}