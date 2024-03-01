import ThemeRegistry from "@/themes/ThemeRegistry"
import SessionProvider from "./SessionProvider"

interface Props {
    children: React.ReactNode
}

export default function Providers({ children }: Props) {
    return (
        <ThemeRegistry options={{ key: 'mui' }}>
            <SessionProvider>
                {children}
            </SessionProvider>
        </ThemeRegistry>
    )
}