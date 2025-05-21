import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Lato"
  },
  palette: {
    primary: {
      light: "#FFFFFF",
      main: "#34C94B",
      dark: "#121212",
      // contrastText: "#fff",
      // navbar:'',
    },
  },
});

export default theme;
