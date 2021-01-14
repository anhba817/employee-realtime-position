import { createMuiTheme } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";
import { viVN } from "@material-ui/core/locale";

const theme = createMuiTheme(
  {
    palette: {
      // type: 'dark',
      primary: {
        light: "rgb(0, 219, 176)",
        main: 'rgb(0, 158, 127)',
        dark: "rgb(1, 112, 90)",
        contrastText: "rgb(255, 255, 255)",
      },
      secondary: {
        light: "rgb(48, 64, 209)",
        main: "rgb(13, 17, 54)",
        dark: "rgb(4, 8, 43)",
      },
      warning: {
        main: "#ffc071",
        dark: "#ffb25e",
      },
      error: {
        xLight: red[50],
        main: 'rgb(255, 91, 96)',
        dark: red[700],
      },
      success: {
        xLight: green[50],
        main: green[500],
        dark: green[700],
      },
      text: {
        primary: "rgb(13, 17, 54)",
      },
      background: {
        default: 'rgb(237, 237, 237)',
        light: 'rgb(228, 244, 252)',
        grey: "rgb(119, 121, 140)",
      }
    },
    typography: {
      fontFamily: "'Lato', sans-serif",
      fontWeightLight: 300, // Work Sans
      fontWeightRegular: 400, // Work Sans
      fontWeightMedium: 700, // Roboto Condensed
      fontFamilySecondary: "'Lato', sans-serif",
      textTransform: "none",
      color: "rgb(13, 17, 54)",
      fontWeight: 700,
      fontSize: 13,
      h2: {
        fontWeight: 700,
        fontSize: 45,
        color: "rgb(13, 17, 54)",
      },
      h3: {
        color: "rgb(119, 121, 140)",
        fontSize: 24,
      },
      h5: {
        color: "rgb(13, 17, 54)",
        fontSize: 15,
        fontWeight: 700,
      },
      h6: {
        color: "rgb(119, 121, 140)",
        fontSize: 13,
      },
      body1: {
        color: "rgb(13, 17, 54)",
        fontFamily: "'Lato', sans-serif",
        fontWeight: 400,
        fontSize: 13,
      },
      body2: {
        color: "rgb(119, 121, 140)",
        fontFamily: "'Lato', sans-serif",
        fontWeight: 400,
        fontSize: 13,
      }
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 767,
        md: 990,
        lg: 1200,
        xl: 1920,
      },
    },
  },
  viVN
);

export default theme;
