import { NotificationsNoneOutlined } from "@mui/icons-material";
import { Badge, IconButton, Popover } from "@mui/material";
import React, { useEffect } from "react";
import NotificationsList from "./NotificationsList";
import { INotification } from "@/interfaces/INotification";
import { useSession } from "next-auth/react";
import { clearNotificationById, fetchNotificationsByUser } from "@/utils/server actions/notification";
import { deleteNotificationById } from "@/database/daos/notificationDao";

export default function NotificationsButton() {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [notifications, setNotifications] = React.useState<INotification[]>([]);
    const { data: session } = useSession();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    function handleClear(id: string) {
        clearNotificationById(id)
        .then(() => fetchNotificationsByUser(session?.user._id!))
        .then((notifications) => setNotifications(notifications));
    }
    const open = Boolean(anchorEl);
    useEffect(() => {
        fetchNotificationsByUser(session?.user._id!)
        .then((notifications) => setNotifications(notifications));
    }, [session]);
    return (
        <>
            <IconButton color="info" onClick={handleClick}>
                <Badge badgeContent={notifications.length} color="secondary" sx={{ m: 1 }}>
                    <NotificationsNoneOutlined />
                </Badge>
            </IconButton>
            <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            >
                <NotificationsList notifications={notifications} handleClear={handleClear}/>
            </Popover>
        </>
    );
}