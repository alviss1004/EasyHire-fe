import { CssBaseline } from "@mui/material";
import {
  alpha,
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { createContext, useMemo, useState } from "react";
import customizeComponents from "./customizations";

const PRIMARY = {
  lighter: "#C8FACD",
  light: "#5BE584",
  main: "#31B9B3",
  dark: "#007B55",
  darker: "#005249",
  contrastText: "#FFF",
};
const SECONDARY = {
  lighter: "#D6E4FF",
  light: "#189AB4",
  main: "#3366FF",
  dark: "#1939B7",
  darker: "#091A7A",
  contrastText: "#FFF",
};
const SUCCESS = {
  lighter: "#E9FCD4",
  light: "#AAF27F",
  main: "#54D62C",
  dark: "#229A16",
  darker: "#08660D",
  contrastText: "#FFF",
};

const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
  500_8: alpha("#919EAB", 0.08),
  500_12: alpha("#919EAB", 0.12),
  500_16: alpha("#919EAB", 0.16),
  500_24: alpha("#919EAB", 0.24),
  500_32: alpha("#919EAB", 0.32),
  500_48: alpha("#919EAB", 0.48),
  500_56: alpha("#919EAB", 0.56),
  500_80: alpha("#919EAB", 0.8),
};

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function ThemeProvider({ children }) {
  const [mode, setMode] = useState("light");

  const themeOptions = (mode) =>
    mode === "light"
      ? {
          palette: {
            primary: PRIMARY,
            secondary: SECONDARY,
            success: SUCCESS,
            background: { paper: "#fff", default: "#F0F3F5" },
          },
          shape: { borderRadius: 8 },
        }
      : {
          palette: {
            mode: "dark",
          },
          background: { default: "#000" },
        };

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        console.log("haha");
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        console.log("MODE", mode);
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeOptions(mode)), [mode]);
  theme.components = customizeComponents(theme);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ThemeProvider;
