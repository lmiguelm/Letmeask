import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled(motion.div)`
  background-color: ${(props) => props.theme.details};
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
  border-radius: 0.5rem;
  padding: 1.5rem;

  & + & {
    margin-top: 0.75rem;
  }

  &.highlighted {
    box-shadow: 0 2px 12px rgba(111, 75, 216, 0.5);
    border: 1px solid ${(props) => props.theme.purple.normal};
  }

  &.answered {
    background-color: ${(props) => props.theme.background};
    opacity: 0.7;
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

    .children-container {
      display: flex;
      gap: 1rem;
      align-items: flex-end;
    }

    button {
      border: 0;
      background: transparent;
      cursor: pointer;
      gap: 0.5rem;

      transition: filter 0.2s;

      &:disabled {
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        filter: brightness(0.9);
      }

      &.like-button {
        display: flex;
        align-items: flex-end;
        color: ${(props) => props.theme.gray.secondary};

        &.liked {
          color: ${(props) => props.theme.purple.normal};

          svg path {
            stroke: ${(props) => props.theme.purple.normal};
          }
        }
      }

      &.delete-button {
        color: ${(props) => props.theme.gray.secondary};
        transition: all 0.4s;

        &:hover {
          color: ${(props) => props.theme.danger.normal};

          svg path {
            stroke: ${(props) => props.theme.danger.normal};
          }
        }
      }

      &.check-button {
        color: ${(props) => props.theme.gray.secondary};
        transition: all 0.4s;

        &:hover {
          color: ${(props) => props.theme.purple.normal};

          svg path,
          svg circle {
            stroke: ${(props) => props.theme.purple.normal};
          }
        }
      }

      &.answer-button {
        color: ${(props) => props.theme.gray.secondary};
        transition: all 0.4s;

        &:hover {
          color: ${(props) => props.theme.purple.normal};

          svg path,
          svg circle {
            stroke: ${(props) => props.theme.purple.normal};
          }
        }
      }
    }
  }
`;
