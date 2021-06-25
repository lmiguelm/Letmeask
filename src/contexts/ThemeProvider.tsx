import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextProviderProps = {
  children: ReactNode;
};

type ThemeContextType = {
  theme: Theme;
  toggleTheme: (theme?: Theme) => void;
};

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider(props: ThemeContextProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const storagedTheme = localStorage.getItem('@letmeask:theme');

    if (!storagedTheme) {
      const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)');
      return prefersColorScheme.matches ? 'dark' : 'light';
    }

    return storagedTheme as Theme;
  });

  useEffect(() => {
    localStorage.setItem('@letmeask:theme', currentTheme);
  }, [currentTheme]);

  const toggleTheme = useCallback((theme?: Theme) => {
    if (!theme) {
      setCurrentTheme((oldstate) => (oldstate === 'light' ? 'dark' : 'light'));
    } else {
      setCurrentTheme(theme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
