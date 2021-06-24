import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${(props) => props.theme.background};
  height: 100vh;
  overflow: none;

  h2 {
    color: ${(props) => props.theme.text.primary};
  }

  a {
    margin-top: 0.5rem;
    color: ${(props) => props.theme.pink.dark};
  }
`;
