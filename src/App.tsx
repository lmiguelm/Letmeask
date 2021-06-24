import { ThemeProvider as StyledComponents } from 'styled-components';
import { AuthProvider } from './contexts/AuthContext';

import { Routes } from './routes/index.routes';

import { GlobalStyle } from './styles/global';

import { darkTheme } from './styles/themes/dark';
import { lightTheme } from './styles/themes/light';

import { AnimatePresence } from 'framer-motion';
import { useThemeApplication } from './hooks/useThemeApplication';

export default function App() {
  const { theme } = useThemeApplication();

  return (
    <StyledComponents theme={theme === 'dark' ? darkTheme : lightTheme}>
      <AuthProvider>
        <GlobalStyle />
        <AnimatePresence exitBeforeEnter>
          <Routes />
        </AnimatePresence>
      </AuthProvider>
    </StyledComponents>
  );
}
