import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';
import astronaut from '../../assets/lotties/astronaut.json';

import { Container } from './styles';

export function NotFound() {
  return (
    <Container>
      <Lottie
        options={{
          animationData: astronaut,
          loop: true,
          autoplay: true,
        }}
        height={300}
        width={300}
      />
      <h2>Página não encontrada.</h2>
      <Link to="/">Ir para home</Link>
    </Container>
  );
}
