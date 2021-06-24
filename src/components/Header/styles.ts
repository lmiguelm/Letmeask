import styled from 'styled-components';
import { motion } from 'framer-motion';

export const HeaderContainer = styled(motion.div)`
  height: 5.56rem;
  padding: 0 10rem;

  background: ${(props) => props.theme.background};
  border-bottom: 1px solid ${(props) => props.theme.gray.secondary};

  display: flex;
  align-items: center;

  &.disabled {
    overflow-y: none;
    background: rgba(0, 0, 0, 0.9);
    cursor: not-allowed;
    pointer-events: none;
  }

  header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  div.menu-mobile {
    cursor: pointer;

    padding: 0.5rem;
    background: ${(props) => props.theme.purple.normal};
    border-radius: 8px;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }

    @media (min-width: 900px) {
      display: none;
    }
  }

  div.mobile-content {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
  }

  img {
    max-height: 46px;
    cursor: pointer;
  }

  div.links-desktop {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;

    @media (max-width: 900px) {
      display: none;
    }
  }

  div.mobile-content {
    padding: 0.5rem;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    > button {
      width: 100%;
    }

    @media (min-width: 900px) {
      display: none;
    }
  }

  button {
    color: ${(props) =>
      props.theme.name === 'light' ? props.theme.purple.normal : props.theme.text.white};
    border: 1px solid ${(props) => props.theme.purple.normal};
    background: transparent;
    font-size: 0.87rem;
    height: 2.5rem;
    width: 8.1rem;
    padding: 0;
  }

  button.room-code {
    overflow: hidden;
    width: 19rem;

    > div {
      background: ${(props) => props.theme.purple.normal};
      padding: 0 0.75rem;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }

    > span {
      display: block;
      align-self: center;
      flex: 1;
      padding: 0 1rem 0 0.75rem;
      width: 15rem;
      font-size: 0.87rem;
      font-weight: 500;
    }
  }
`;
