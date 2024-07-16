import "@/app/_styles/globals.css";
import CssBaseline from "@mui/material/CssBaseline"
import Providers from "@/app/_providers/Providers";
import Navbar from "@/app/_components/navbar/Navbar";
import styles from "@/app/_styles/layout.module.css";
import Box from "@mui/material/Box/Box";

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        <Providers>
          <Box className={styles["layout"]}>
            <Navbar />
            <Box className={styles["content"]}>
              {children}
            </Box>
          </Box>

        </Providers>
        {/* {children} */}
      </body>
    </html>
  )
}
