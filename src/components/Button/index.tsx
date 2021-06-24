import { HTMLMotionProps } from 'framer-motion';
import { Container } from './styles';

type IButtonProps = HTMLMotionProps<'button'>;

export function Button({ children, ...rest }: IButtonProps) {
  return (
    <Container
      whileTap={
        !rest.disabled
          ? {
              scale: 1.02,
            }
          : {}
      }
      {...rest}
    >
      {children}
    </Container>
  );
}
