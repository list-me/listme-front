import React from 'react';
import {ThemeProvider} from "styled-components";
import {Router} from './routes';
import {theme} from "./styles/theme";
import GlobalStyles from "./styles/globalStyles";
import {Toast} from "./components/Toast";

function App() {
  return (
   <ThemeProvider theme={theme}>
       <Toast />
       <GlobalStyles />
       <Router />
   </ThemeProvider>
  );
}

export default App;
