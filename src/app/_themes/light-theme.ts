import { createTheme } from "@mui/material/styles";
import NextLink from "next/link";
import { forwardRef } from "react";
import { LinkBehaviour } from "../_components/LinkBehavior";
import { blue } from "@mui/material/colors";

let lightTheme = createTheme({
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
  },
  palette: {
    mode: "light",
    primary: {
      main: "#1E1E1E",
    },
    secondary: {
      main: "#CC0000",
      contrastText: "#ffffff",
    },
    info: {
      main: "#CCCCCC",
      contrastText: "#333333",
    },
    success: {
      main: "#28a745",
    },
    error: {
      main: "#dc3545",
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehaviour,
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: "fixed",
      },
      styleOverrides: {
        root: {
          background:
            " linear-gradient(90deg, rgb(153,0,0) 0%, rgba(204,51,51) 100%)",
        },
      },
    },

    MuiTypography: {
      defaultProps: {
        color: "text2",
      },
      styleOverrides: {
        h1: {
          fontSize: 30,
          fontWeight: 600,
        },
        h2: {
          fontSize: 20,
          fontWeight: 400,
        },
        subtitle1: {
          fontSize: 18,
          fontWeight: 600,
        },
      },
    },

    MuiButton: {
      defaultProps: {
        variant: "contained",
        size: "small",
        disableElevation: true,
        color: "info",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none",
          borderRadius: 10,
        },
      },
    },

    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          boxShadow: "0px 5px 5px rgba(0,0,0,0.05)",
          borderRadius: "10px",
        },
      },
    },

    MuiAccordion: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          border: 0,
          "&:not(:last-child)": {
            borderBottom: 0,
          },
          "&:before": {
            display: "none",
          },
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          border: "3px solid transparent",
          background:
            "linear-gradient(white, white) padding-box, linear-gradient(to right, #990000, #CC3333) border-box",
        },
      },
    },
  },
});

lightTheme = createTheme(lightTheme, {
  palette: {
    text1: lightTheme.palette.augmentColor({
      color: {
        main: "#333333",
      },
      name: "text1",
    }),
    text2: lightTheme.palette.augmentColor({
      color: {
        main: "#666666",
      },
      name: "text2",
    }),
    contrast: lightTheme.palette.augmentColor({
      color: {
        main: "#ffffff",
      },
      name: "contrast",
    }),
    badge: lightTheme.palette.augmentColor({
      color: {
        main: blue[500],
      },
    }),
  },
});

export { lightTheme };
