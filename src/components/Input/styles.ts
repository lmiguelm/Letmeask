import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    height: 50px;
    border-radius: 8px;
    padding: 0 16px;
    background: #fff;
    border: 1px solid #a8a8b3;
    outline: none;

    transition: all 0.2s;

    &::placeholder {
      transition: 0.4s;
    }

    &:focus {
      border: 1px solid ${(props) => props.theme.purple.hover};

      &::placeholder {
        transform: scale(0.9);
      }
    }
  }

  span {
    align-self: flex-start;

    text-transform: uppercase;
    font-weight: bold;
    font-size: 10px;

    user-select: none;
    margin-top: 5px;

    color: ${(props) => props.theme.danger.normal};
  }
`;
