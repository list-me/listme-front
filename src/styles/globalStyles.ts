import 'handsontable/dist/handsontable.full.min.css';
import '../fonts/fontStyle.css';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    outline: 0;
    padding: 0;
  }
  
  *::before,
  *::after {
    box-sizing: border-box;
  }
  
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
    overflow-x: hidden;
  }
  
  body {
    background-color: ${({theme}) => theme.colors.background.default};
    font-family: Satoshi Regular;
    font-weight: 500;
    min-height: 100vh;
 
    text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    overscroll-behavior: contain;
  }
    
  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  img {
    border-style: none;
    height: auto;
    max-width: 100%;
    vertical-align: middle;
    user-select: none;
  }
  
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
    margin-bottom: 1.5rem;
    margin-top: 0;
  }
  
  p,
  a {
    margin-bottom: 1rem;
    margin-top: 0;
  }
  
  a {
    background-color: transparent;
    text-decoration: none;
  }

  button, input, textarea, select {
    font-family: Satoshi Regular;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
