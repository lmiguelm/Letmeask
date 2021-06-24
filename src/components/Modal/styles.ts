import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Modal = styled(motion.div)`
  border-radius: 8px;
  background: ${(props) => props.theme.purple.normal};

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    height: 5rem;
    width: 5rem;
  }

  h2 {
    margin: 1rem 0;
  }

  .buttons-container {
    display: flex;
    margin-top: 3rem;
    gap: 1rem;

    button:first-child {
      background: ${(props) => props.theme.gray.primary};
      color: #444;
    }

    button:last-child {
      background: ${(props) => props.theme.danger.normal};
      color: ${(props) => props.theme.text.white};
    }
  }
`;
