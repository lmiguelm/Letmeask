import Lottie from 'react-lottie';
import rocket from '../../assets/lotties/rocket.json';

import { Container } from './styles';

export function Loading() {
  return (
    <Container>
      <Lottie
        options={{
          animationData: rocket,
          loop: true,
          autoplay: true,
        }}
        height={300}
        width={300}
      />
    </Container>
  );
}
