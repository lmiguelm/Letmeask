import { HTMLMotionProps, motion } from 'framer-motion';
import { useState, HTMLAttributes } from 'react';

import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from 'styled-components';
import { useThemeApplication } from '../../hooks/useThemeApplication';

import { Toggle, Container } from './styles';

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};

type ISwitchThemeProps = HTMLAttributes<HTMLDivElement>;

export function SwitchTheme(props: ISwitchThemeProps) {
  const { purple, text } = useTheme();
  const { toggleTheme, theme } = useThemeApplication();

  function toggleSwitch(theme?: 'dark' | 'light') {
    toggleTheme(theme);
  }

  return (
    <Container {...props}>
      <FiMoon
        onClick={() => toggleSwitch('dark')}
        color={theme === 'dark' ? purple.normal : text.primary}
        size={18}
      />
      <Toggle
        style={theme !== 'dark' ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }}
        onClick={() => toggleSwitch()}
      >
        <motion.div className="handle" layout transition={spring}></motion.div>
      </Toggle>
      <FiSun
        onClick={() => toggleSwitch('light')}
        color={theme === 'light' ? purple.normal : text.primary}
        size={18}
      />
    </Container>
  );
}
