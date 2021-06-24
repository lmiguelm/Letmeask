import { Container } from './styles';

import emptyImg from '../../assets/images/empty-questions.svg';

export function EmptyQuestion() {
  return (
    <Container>
      <img src={emptyImg} alt="Nenhuma questão" />
      <h2>Nenhuma pergunta por aqui...</h2>
      <p>
        Envie o código desta sala para seus amigos e <br /> comece a responder perguntas!
      </p>
    </Container>
  );
}
