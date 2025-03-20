import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import theme from "../muiTheme";
import AppRouter from "./AppRouter";
import "./index.css";

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AppRouter />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
