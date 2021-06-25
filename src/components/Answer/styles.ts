import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled(motion.div)`
  background-color: ${(props) => props.theme.details};
  box-shadow: 0 2px 12px rgba(111, 75, 216, 0.5);
  border-radius: 0.5rem;
  padding: 1.5rem;
  flex: 1;

  & + & {
    margin-top: 0.75rem;
  }

  p {
    flex: 1;
    color: ${(props) => props.theme.text.primary};
    text-align: justify;
    word-break: break-all; // fazer a tag quebrar de linha no final da div
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;

    .user-info {
      display: flex;
      align-items: center;

      img {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
      }

      span {
        margin-left: 0.5rem;
        color: ${(props) => props.theme.gray.primary};
        font-size: 0.87rem;
      }
    }
  }
`;
