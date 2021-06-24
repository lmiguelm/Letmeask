import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PageAuth = styled(motion.div)`
  display: flex;
  align-items: stretch;
  height: 100vh;
  overflow: hidden;

  aside {
    flex: 1;

    background: ${(props) => props.theme.purple.normal};
    color: #fff;

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 7.5rem;

    @media (max-width: 900px) {
      display: none;
    }

    img {
      max-width: 20rem;
    }

    strong {
      font: 700 2.25rem 'Poopins', sans-serif;
      line-height: 2.6rem;
      margin-top: 1rem;
    }

    p {
      font-size: 1.5rem;
      line-height: 2rem;
      margin-top: 1rem;
      color: #f8f8f8;
    }
  }

  main {
    flex: 2;

    padding: 0 2rem;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .main-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 20rem;
    align-items: stretch;
    text-align: center;

    > img {
      align-self: center;
    }
  }

  form {
    button {
      margin-top: 1rem;
    }

    button,
    input {
      width: 100%;
    }
  }

  .theme-container {
    margin-top: 2rem;
    align-self: center;
  }

  .create-room {
    margin-top: 4rem;
    background: #ea4335;
  }

  .separator {
    font-size: 0.87rem;
    color: ${(props) => props.theme.gray.primary};

    margin: 2rem 0;

    display: flex;
    align-items: center;

    &::before {
      content: '';
      flex: 1;
      height: 1px;
      background: ${(props) => props.theme.gray.primary};
      margin-right: 1rem;
    }

    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background: ${(props) => props.theme.gray.primary};
      margin-left: 1rem;
    }
  }
`;
