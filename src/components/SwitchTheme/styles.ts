import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      transform: scale(1.1);
      filter: brightness(0.9);
    }
  }
`;

export const Toggle = styled.div`
  width: 2.8rem;
  height: 1.5rem;
  background-color: ${(props) => props.theme.purple.normal};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 50px;
  padding: 0.6rem;
  cursor: pointer;

  div.handle {
    width: 0.6rem;
    height: 0.6rem;
    background-color: white;
    border-radius: 100%;
  }
`;
