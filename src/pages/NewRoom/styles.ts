import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PageNewRoom = styled(motion.div)`
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

  h2 {
    font-size: 24px;
    margin: 64px 0 24px;
    font-family: 'Poppins', sans-serif;
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

  p {
    font-size: 14px;
    color: ${(props) => props.theme.gray.primary};
    margin-top: 16px;

    a {
      color: ${(props) => props.theme.pink.light};
      text-decoration: none;
      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.9);
      }
    }
  }
`;
