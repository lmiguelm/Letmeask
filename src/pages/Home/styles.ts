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

    padding: 120px;

    @media (max-width: 900px) {
      display: none;
    }

    img {
      max-width: 320px;
    }

    strong {
      font: 700 36px 'Poopins', sans-serif;
      line-height: 42px;
      margin-top: 16px;
    }

    p {
      font-size: 24px;
      line-height: 32px;
      margin-top: 16px;
      color: #f8f8f8;
    }
  }

  main {
    flex: 2;

    padding: 0 32px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .main-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 320px;
    align-items: stretch;
    text-align: center;

    > img {
      align-self: center;
    }
  }

  form {
    button {
      margin-top: 16px;
    }

    button,
    input {
      width: 100%;
    }
  }

  .create-room {
    margin-top: 64px;
    background: #ea4335;
  }

  .separator {
    font-size: 14px;
    color: ${(props) => props.theme.gray.primary};

    margin: 32px 0;

    display: flex;
    align-items: center;

    &::before {
      content: '';
      flex: 1;
      height: 1px;
      background: ${(props) => props.theme.gray.primary};
      margin-right: 16px;
    }

    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background: ${(props) => props.theme.gray.primary};
      margin-left: 16px;
    }
  }
`;
