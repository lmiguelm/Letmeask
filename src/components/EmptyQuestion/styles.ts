import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  h2 {
    color: ${(props) => props.theme.text.primary};
  }

  p {
    text-align: center;
    color: ${(props) => props.theme.gray.primary};
  }
`;
