import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.button)`
  height: 3.12rem;
  border-radius: 0.5rem;
  font-weight: 500;
  background-color: ${(props) => props.theme.purple.normal};
  color: ${(props) => props.theme.text.white};
  padding: 0 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border: 0;

  transition: filter 0.2s;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  img {
    margin-right: 0.5rem;
  }
`;
