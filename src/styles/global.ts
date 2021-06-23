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

  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.gray.secondary};
  }

  ::-webkit-scrollbar {
    width: 6px;
    background: ${(props) => props.theme.gray.secondary};
  }
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.purple.normal};
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
