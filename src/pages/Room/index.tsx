import { FormEvent, Fragment, useState } from 'react';
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
import { Error } from '../../components/Error';

import { PageRoom } from './styles';
import { fadeInUp, stagger } from '../../styles/animation';
import { EmptyQuestion } from '../../components/EmptyQuestion';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FiCornerDownRight, FiThumbsUp } from 'react-icons/fi';
import { Answer } from '../../components/Answer';
import { Helmet } from 'react-helmet';

type IRoomParams = {
  id: string;
};

export function Room() {
  const { id: roomId } = useParams<IRoomParams>();

  const { user, signinWithGoogle } = useAuth();
  const { details, text, pink } = useTheme();
  const { questions, loadedRoom, title, ended } = useRoom(roomId);

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
      isAnswered: false,
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

  if (!loadedRoom) {
    return <Loading />;
  }

  if (ended) {
    return (
      <Error
        title={`Sala encerrada em ${format(new Date(ended), 'PPPP', {
          locale: ptBR,
        })}`}
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>Sala {title}</title>
      </Helmet>

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
                  Para enviar uma pergunta e curtir{' '}
                  <button type="button" onClick={signinWithGoogle}>
                    faça seu login
                  </button>
                </span>
              )}

              <Button disabled={!user} type="submit">
                Enviar Pergunta
              </Button>
            </footer>
          </form>

          {questions.length > 0 ? (
            <div className="question-and-answer-list ">
              {questions.map((question) => (
                <Fragment key={question.id}>
                  <div className="question-container">
                    <Question
                      key={question.id}
                      author={question.author}
                      content={question.content}
                      isHighLighted={question.isHighLighted}
                      isAnswered={question.isAnswered}
                      whileHover={
                        !question.isAnswered
                          ? {
                              scale: 1.02,
                              cursor: 'pointer',
                            }
                          : {}
                      }
                    >
                      {!question.isAnswered && (
                        <motion.button
                          disabled={!user}
                          onClick={() => handleLikeQuesiton(question.id, question.likeId)}
                          whileTap={
                            !question.likeId && user
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
                          <FiThumbsUp size={24} />
                        </motion.button>
                      )}
                    </Question>
                  </div>

                  {question.answers.map((v) => (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="answer-container"
                      key={v.content}
                    >
                      <FiCornerDownRight size={24} color={pink.dark} />

                      <Answer author={v.author} content={v.content} />
                    </motion.div>
                  ))}
                </Fragment>
              ))}
            </div>
          ) : (
            <div className="empty-questions">
              <EmptyQuestion />
            </div>
          )}
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
