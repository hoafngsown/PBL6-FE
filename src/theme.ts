import { createTheme } from "@mui/material";
import { Shadows } from "@mui/material/styles/shadows";
import { COLORS } from "./constants";

export const theme = createTheme({
  shadows: Array(25).fill("none") as Shadows,
  typography: {
    fontFamily: ['"Noto Sans JP"', "sans-serif"].join(","),
    allVariants: {
      color: COLORS.darkGray,
    },
    fontWeightRegular: 400,
  },
  palette: {
    primary: {
      main: COLORS.primary,
      contrastText: "#FFF",
    },
    secondary: {
      main: COLORS.secondary,
    },
  },
});
