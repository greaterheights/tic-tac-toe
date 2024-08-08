import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    font-family: Arial, sans-serif;
  }
`;

export default GlobalStyles;
