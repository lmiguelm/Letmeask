import { HTMLMotionProps, motion } from 'framer-motion';
import { useTheme } from 'styled-components';

import { Container } from './styles';

type IInputProps = HTMLMotionProps<'input'> & {
  errorMessage?: string;
};

export function Input({ errorMessage, ...rest }: IInputProps) {
  const { danger } = useTheme();

  return (
    <Container>
      <motion.input
        {...rest}
        style={errorMessage ? { border: `1px solid ${danger.normal}` } : {}}
      />

      {errorMessage && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {errorMessage}
        </motion.span>
      )}
    </Container>
  );
}
