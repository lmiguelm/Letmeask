import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.button)`
  height: 50px;
  border-radius: 8px;
  font-weight: 500;
  background-color: ${(props) => props.theme.purple.normal};
  color: ${(props) => props.theme.text.white};
  padding: 0 32px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border: 0;

  transition: filter 0.2s;

  &:disabled {
    opacity: 0.6;
    cursor: not-not-allowed;
  }

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  img {
    margin-right: 8px;
  }
`;
