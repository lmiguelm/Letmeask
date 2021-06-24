import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';

import { database } from '../../services/firebase';

import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from 'styled-components';
import { useRoom } from '../../hooks/useRoom';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Question } from '../../components/Question';
import { Loading } from '../../components/Loading';

import { PageRoom } from './styles';
import { fadeInUp, stagger } from '../../styles/animation';

type IRoomParams = {
  id: string;
};

export function Room() {
  const { id: roomId } = useParams<IRoomParams>();

  const { user } = useAuth();
  const { details, text } = useTheme();
  const { questions, loadedQuestions, title } = useRoom(roomId);

  const [newQuestion, setNewQuestion] = useState<string>();

  const [showiInputError, setShowInputError] = useState<boolean>(false);

  const error = (time = 4000) => {
    setShowInputError(true);
    setTimeout(() => setShowInputError(false), time);
  };

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (!newQuestion || newQuestion.trim() === '') {
      toast.error('Insira uma pergunta!');
      error();
      return;
    }

    if (!user) {
      toast.error('Você precisa estar logado para fazer uma pergunta!');
      error();
    }

    const question = {
      content: newQuestion,
      author: {
        name: user?.name,
        avatar: user?.avatar,
      },
      isHighLighted: false,
      isAnswer: false,
    };

    try {
      await database.ref(`/rooms/${roomId}/questions`).push(question);
      toast.success('Pergunta enviada com sucesso!');
    } catch {
      toast.error('Ocorreu um erro ao enviar a pergunta. Tente novamente mais tarde!');
      error();
    } finally {
      setNewQuestion('');
    }
  }

  async function handleLikeQuesiton(questionId: string, likeId: string | undefined) {
    if (!!likeId) {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove();
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      });
    }
  }

  if (!loadedQuestions) {
    return <Loading />;
  }

  return (
    <>
      <Header code={roomId} />

      <PageRoom variants={stagger} initial="initial" animate="animate" exit={{ opacity: 0 }}>
        <motion.main variants={fadeInUp}>
          <div className="room-title">
            <h1>Sala {title}</h1>
            {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
          </div>

          <form onSubmit={handleSendQuestion}>
            <textarea
              value={newQuestion}
              onChange={(event) => {
                setShowInputError(false);
                setNewQuestion(event.target.value);
              }}
              placeholder="O que você quer perguntar?"
              style={showiInputError ? { boxShadow: `0 2px 12px rgba(215, 55, 84, 0.5)` } : {}}
            />

            <footer>
              {user ? (
                <div className="user-info">
                  <img src={user.avatar} alt={user.name} />
                  <span>{user.name}</span>
                </div>
              ) : (
                <span>
                  Para enviar uma pergunta <button>faça seu login</button>
                </span>
              )}

              <Button disabled={!user} type="submit">
                Enviar Pergunta
              </Button>
            </footer>
          </form>

          <div className="question-list">
            {questions.map((question) => (
              <Question key={question.id} author={question.author} content={question.content}>
                <motion.button
                  onClick={() => handleLikeQuesiton(question.id, question.likeId)}
                  whileTap={
                    !question.likeId
                      ? {
                          scale: 1.1,
                        }
                      : {}
                  }
                  className={`like-button ${question.likeId ? 'liked' : ''} `}
                  type="button"
                  aria-label="Marcar como gostei"
                >
                  {question.likeCount > 0 && <span>{question.likeCount}</span>}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                      stroke="#737380"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              </Question>
            ))}
          </div>
        </motion.main>
      </PageRoom>

      <Toaster
        toastOptions={{ style: { background: details, color: text.primary } }}
        position="bottom-right"
        reverseOrder={false}
      />
    </>
  );
}
