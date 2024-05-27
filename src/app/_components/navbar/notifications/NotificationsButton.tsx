import { NotificationsNoneOutlined } from "@mui/icons-material";
import { Badge, IconButton, Popover } from "@mui/material";
import React, { useEffect } from "react";
import NotificationsList from "./NotificationsList";
import { INotification } from "@/app/_interfaces/INotification";
import { useSession } from "next-auth/react";
import { clearNotificationById, fetchNotificationsByUser } from "@/app/_utils/server actions/notification";
import { deleteNotificationById } from "@/app/_database/daos/notificationDao";
import { pusherClient } from "@/app/_lib/pusher";

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
        if (session) {
            console.log("Se llama el useEffect");
            pusherClient.subscribe(session?.user._id!);
            pusherClient.bind("event", (notification: INotification) => {
                console.log("Ocurrió un cambio en el WebSocket, me llegó esto");
                console.log(notification);
                setNotifications((prev) => [...prev, notification]);
            });
            fetchNotificationsByUser(session?.user._id!)
                .then((notifications) => setNotifications(notifications));
            return () => {
                console.log("Me desuscribo")
                pusherClient.unbind();
                pusherClient.unsubscribe(session?.user._id!);
            }
        }
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
                <NotificationsList notifications={notifications} handleClear={handleClear} />
            </Popover>
        </>
    );
}