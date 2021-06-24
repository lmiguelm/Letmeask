import styled from 'styled-components';

export const Container = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.background};
  height: 100vh;
`;
