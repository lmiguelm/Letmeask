import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }

  body {
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text.primary};
  }

  body, input, button, textarea {
    font: 400 1rem 'Roboto', sans-serif;
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }
`;
