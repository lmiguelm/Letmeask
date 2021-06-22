import { HTMLMotionProps } from 'framer-motion';
import { Container } from './styles';

interface IButtonProps extends HTMLMotionProps<'button'> {}

export function Button({ children, ...rest }: IButtonProps) {
  return (
    <Container
      whileTap={{
        scale: 1.02,
      }}
      {...rest}
    >
      {children}
    </Container>
  );
}
