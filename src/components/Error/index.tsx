import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';
import astronaut from '../../assets/lotties/astronaut.json';

import { Container } from './styles';

type IError = {
  title?: string;
};

export function Error({ title = 'Página não encontrada.' }: IError) {
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
      <h2>{title}</h2>
      <Link to="/">Ir para home</Link>
    </Container>
  );
}
