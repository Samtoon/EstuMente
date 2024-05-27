import { UiContext } from "@/app/_contexts/ui/UiContext";
import { AccountCircleOutlined } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemIconProps, ListItemText, SvgIcon } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext } from "react";
interface Props {
    label: string,
    path: string,
    children: React.ReactNode
}
export default function MenuItem({ label, path, children } : Props) {
    const router = useRouter();
    const { toggleSideMenu } = useContext(UiContext);

    const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url);
  };
    return(
        <ListItemButton onClick={() => navigateTo(path)}>
            <ListItemIcon>
                {children}
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    )
}