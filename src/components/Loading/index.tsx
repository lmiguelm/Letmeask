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
        height={500}
        width={500}
      />
    </Container>
  );
}
