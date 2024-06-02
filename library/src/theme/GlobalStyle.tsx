import { createGlobalStyle } from 'styled-components';
import '@fontsource-variable/plus-jakarta-sans';

const GlobalStyle = createGlobalStyle`
  body {
    font-size: ${({ theme }) => theme.fonts.defaultSize};
    font-family: 'Plus Jakarta Sans Variable', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
