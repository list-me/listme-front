import React from "react";
import { ThemeProvider } from "styled-components";
import { Router } from "./routes";
import theme from "./styles/theme";
import GlobalStyles from "./styles/globalStyles";
import { Toast } from "./components/Toast";
import { AppContextProvider } from "./context";
import FromTo from "./components/FromTo";

function App() {
  return (
    <AppContextProvider>
      <ThemeProvider theme={theme}>
        <Toast />
        <GlobalStyles />
        <Router />
        <FromTo />
      </ThemeProvider>
    </AppContextProvider>
  );
}

export default App;
