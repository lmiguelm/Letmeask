import { FormEvent, forwardRef, Ref } from 'react';
import { Button } from '../Button';
import { Container } from './styles';

type IAnswerProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
};

export function Answer({ content, author }: IAnswerProps) {
  return (
    <Container>
      <p>{content}</p>

      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
      </footer>
    </Container>
  );
}
