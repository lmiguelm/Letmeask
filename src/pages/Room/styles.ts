import { motion } from 'framer-motion';
import styled from 'styled-components';

export const PageRoom = styled(motion.div)`
  height: calc(100vh - 5.56rem);
  overflow-y: scroll;

  main {
    max-width: 50rem;
    margin: 0 auto;
    padding: 0 0 3rem;

    @media (max-width: 900px) {
      padding: 0rem 1rem;
    }

    .room-title {
      margin: 2rem 0 1.5rem;
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

    form {
      textarea {
        width: 100%;
        padding: 1rem;
        border-radius: 0.5rem;
        background-color: ${(props) => props.theme.details};
        color: ${(props) => props.theme.text.primary};
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
        border: none;
        resize: vertical;
        min-height: 8.1rem;
        outline: none;

        transition: all 0.4s;

        &:focus {
          box-shadow: 0 2px 12px rgba(111, 75, 216, 0.5);
        }
      }

      footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;

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

        > span {
          font-size: 0.87rem;
          color: ${(props) => props.theme.gray.primary};
          font-weight: 500;

          button {
            background: transparent;
            border: none;
            color: ${(props) => props.theme.pink.dark};
            text-decoration: underline;
            font-size: 0.87rem;
            font-weight: 500;
            cursor: pointer;
          }
        }
      }
    }

    .question-and-answer-list {
      margin-top: 3rem;

      .question-container {
        margin-top: 2.5rem;
      }

      .answer-container-input {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 1rem;
        margin: 0.5rem 0 3rem 0;

        svg {
          margin-top: -3.5rem;
        }

        div {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-end;

          textarea {
            width: 100%;
            padding: 1rem;
            border-radius: 0.5rem;
            background-color: ${(props) => props.theme.details};
            color: ${(props) => props.theme.text.primary};
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
            border: none;
            resize: vertical;
            min-height: 8.1rem;
            outline: none;

            transition: all 0.4s;

            &:focus {
              box-shadow: 0 2px 12px rgba(111, 75, 216, 0.5);
            }
          }

          button {
            width: 10rem;
            margin-top: 1rem;
          }
        }
      }

      .answer-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin: 0.5rem 0;

        svg {
          margin-top: -3.5rem;
        }

        & + & {
          margin: 0;
        }
      }
    }

    .empty-questions {
      margin-top: 100px;
    }
  }
`;
