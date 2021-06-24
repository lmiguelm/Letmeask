import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    height: 3.15rem;
    border-radius: 0.5rem;
    padding: 0 1rem;
    background: #fff;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
    outline: none;
    border: none;

    transition: all 0.2s;

    &::placeholder {
      transition: 0.4s;
    }

    &:focus {
      box-shadow: 0 2px 12px rgba(111, 75, 216, 0.5);

      &::placeholder {
        transform: scale(0.9);
      }
    }
  }

  span {
    align-self: flex-start;

    text-transform: uppercase;
    /* font-weight: bold; */
    font-size: 0.75rem;

    user-select: none;
    margin-top: 0.3rem;

    color: ${(props) => props.theme.danger.normal};
  }
`;
