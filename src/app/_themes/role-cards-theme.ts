import { createTheme } from "@mui/material";

export const selectedTheme = createTheme({
    palette: {
        background: {
          paper: '#7f00ff', // your color
        },
        text: {
            secondary: "#FFFFFF"
        }
      },
});

export const unselectedTheme = createTheme({
    palette: {
        background: {
          paper: '#EFF7FF', // your color
        },
        text: {
            secondary: "#000000"
        }
      },
})