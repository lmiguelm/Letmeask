import { HTMLMotionProps, motion } from 'framer-motion';

import { Container } from './styles';

type IInputProps = HTMLMotionProps<'input'> & {
  errorMessage?: string;
};

export function Input({ errorMessage, ...rest }: IInputProps) {
  return (
    <Container>
      <motion.input
        {...rest}
        style={errorMessage ? { boxShadow: `0 2px 12px rgba(215, 55, 84, 0.5)` } : {}}
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
