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
    font-size: 1.25rem;
    color: ${(props) => props.theme.text.primary};
  }

  a {
    font-size: 0.87rem;
    margin-top: 0.5rem;
    color: ${(props) => props.theme.pink.dark};
  }
`;
