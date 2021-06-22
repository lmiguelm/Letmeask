import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;
    background: string;
    details: string;
    shadow: string;
    gradiant: string;
    text: {
      primary: string;
      white: string;
    };
    danger: {
      normal: string;
      hover: string;
    };
    purple: {
      normal: string;
      hover: string;
    };
    pink: {
      light: string;
      dark: string;
    };
    gray: {
      primary: string;
      secondary: string;
    };
  }
}
