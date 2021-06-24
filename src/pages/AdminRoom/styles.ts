import { motion } from 'framer-motion';
import styled from 'styled-components';

export const PageRoom = styled(motion.div)`
  height: calc(100vh - 5.56rem);
  overflow-y: scroll;

  main {
    max-width: 50rem;
    margin: 0 auto;
    padding: 0 0 3rem 0;
    min-height: 100%;

    @media (max-width: 900px) {
      padding: 0rem 1rem;
    }

    .room-title {
      padding: 2rem 0 1.5rem;
      display: flex;
      align-items: center;

      h1 {
        font-family: 'Poopins', sans-serif;
        font-size: 1.5rem;
        color: ${(props) => props.theme.text.primary};
      }

      span {
        margin-left: 1rem;
        background-color: ${(props) => props.theme.pink.dark};
        border-radius: 999999px;
        padding: 0.5rem 1rem;
        color: ${(props) => props.theme.text.white};
        font-weight: 500;
        font-size: 0.87;
      }
    }

    .question-list {
      margin-top: 3rem;
    }

    .empty-questions {
      margin-top: 100px;
    }

    .delete {
      stroke: red;
    }
  }
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;

  height: 100vh;
  width: 100%;
  overflow-y: none;
  background: rgba(0, 0, 0, 0.7);
  z-index: 2;
`;
