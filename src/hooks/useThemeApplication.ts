import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeProvider';

export function useThemeApplication() {
  return useContext(ThemeContext);
}
