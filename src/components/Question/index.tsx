import { HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { Container } from './styles';

type IQuestionProps = HTMLMotionProps<'div'> & {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighLighted?: boolean;
};

export function Question({
  isAnswered = false,
  isHighLighted = false,
  content,
  author,
  children,
  ...rest
}: IQuestionProps) {
  return (
    <Container
      {...rest}
      className={`${isAnswered ? `answered` : ''} ${
        isHighLighted && !isAnswered ? `highlighted` : ``
      }`}
    >
      <p>{content}</p>

      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>

        <div className="children-container">{children}</div>
      </footer>
    </Container>
  );
}
