import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  body {
    background: #F0F0F5;
    -webkit-font-smoothing: antialiased;
    margin: 0 auto;
    max-width: 1140px;
  }
  body, input, button {
    font-family: 'Roboto Mono', monospace;
  }
  button {
    cursor: pointer;
  }
`;