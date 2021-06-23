import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './contexts/AuthContext';

import { Routes } from './routes/index.routes';

import { GlobalStyle } from './styles/global';

import { darkTheme } from './styles/themes/dark';
import { lightTheme } from './styles/themes/light';

import { AnimatePresence } from 'framer-motion';

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <AuthProvider>
        <GlobalStyle />
        <AnimatePresence exitBeforeEnter>
          <Routes />
        </AnimatePresence>
      </AuthProvider>
    </ThemeProvider>
  );
}
