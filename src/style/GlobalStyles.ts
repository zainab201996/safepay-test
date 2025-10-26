import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;700&display=swap');

* {
  box-sizing: 0;
  }
  
  body {
  font-family: ${({ theme }) => theme.fonts.light};
  color: ${({ theme }) => theme.colors.primary.blue};
  margin: 0;
  padding: 0;

  }
  
  h1,h2,h3,h4,h5,h6{
    font-family: ${({ theme }) => theme.fonts.bold};
  }
`;
