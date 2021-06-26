import { useCallback, useState, Fragment, FormEvent, useRef } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { FiMessageSquare, FiTrash, FiCornerDownRight } from 'react-icons/fi';

import { database } from '../../services/firebase';

import { useHistory, useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useRoom } from '../../hooks/useRoom';

import { Header } from '../../components/Header';
import { Question } from '../../components/Question';
import { Loading } from '../../components/Loading';
import { Modal } from '../../components/Modal';
import { EmptyQuestion } from '../../components/EmptyQuestion';
import { Error } from '../../components/Error';
import { Answer } from '../../components/Answer';

import { Overlay, PageRoom } from './styles';
import { fadeInUp, stagger } from '../../styles/animation';

import removeImg from '../../assets/images/remove.svg';

import { ptBR } from 'date-fns/locale';
import format from 'date-fns/format';
import { delay } from '../../utils/delay';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/Button';
import { Helmet } from 'react-helmet';

type IRoomParams = {
  id: string;
};

export function AdminRoom() {
  const { id: roomId } = useParams<IRoomParams>();
  const navigate = useHistory();

  const { purple, pink } = useTheme();
  const { questions, loadedRoom, title, isAdmin, ended } = useRoom(roomId);
  const { user } = useAuth();

  const textareaAnswerRef = useRef<HTMLTextAreaElement>(null);

  const [answer, setAnswer] = useState<string>();
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
  const [showAnswerQuestion, setShowAnswerQuestion] = useState<string | undefined>();
  const [showInputError, setShowInputError] = useState<boolean>(false);

  const handleEndRoom = useCallback(async () => {
    setIsActiveModal(true);
    toast((t) => {
      const deletteQuestion = async () => {
        await database.ref(`rooms/${roomId}`).update({
          endedAt: new Date(),
        });

        setIsActiveModal(false);
        toast.dismiss(t.id);
        navigate.push('/');
      };

      const hideToast = () => {
        setIsActiveModal(false);
        toast.dismiss(t.id);
      };

      t.pauseDuration = 86400; // 24 hrs
      t.position = 'top-center';
      t.type = 'blank';
      t.style = {
        background: purple.normal,
        color: '#fff',
        margin: 250,
      };

      return (
        <Modal onConfirm={deletteQuestion} onCancel={hideToast}>
          <img src={removeImg} alt="Delete" />

          <h2>Encerrar a sala</h2>

          <p>Tem certeza que deseja encerrar esta sala?</p>
        </Modal>
      );
    });
  }, [roomId]);

  async function handleDeleteQuestion(questionId: string) {
    setIsActiveModal(true);

    toast((t) => {
      const deleteQuestion = async () => {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        toast.dismiss(t.id);
        setIsActiveModal(false);
      };

      const hideToast = () => {
        toast.dismiss(t.id);
        setIsActiveModal(false);
      };

      t.pauseDuration = 86400; // 24 hrs
      t.position = 'top-center';
      t.type = 'blank';
      t.style = {
        background: purple.normal,
        color: '#fff',
        margin: 250,
      };

      return (
        <Modal onConfirm={deleteQuestion} onCancel={hideToast}>
          <img src={removeImg} alt="Delete" />

          <h2>Remover pergunta</h2>

          <p>Tem certeza que deseja remover esta pergunta?</p>
        </Modal>
      );
    });
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleShowAnswerInput(questionId: string, isHighLighted: boolean) {
    setShowAnswerQuestion((oldstate) => (!oldstate ? questionId : undefined));
    setAnswer(undefined);

    if (!isHighLighted) {
      await delay();
      textareaAnswerRef.current?.focus();
    }

    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighLighted: !isHighLighted,
    });
  }

  const handleAnswerQuestion = useCallback(
    async (event: FormEvent, questionId: string) => {
      event.preventDefault();

      if (!answer || answer.trim() === '') {
        toast.error('Insira uma pergunta!');
        setShowInputError(true);
        return;
      }
      setShowAnswerQuestion(undefined);

      await database.ref(`rooms/${roomId}/questions/${questionId}/answers`).push({
        content: answer,
        author: {
          avatar: user?.avatar,
          name: user?.name,
        },
      });

      toast.success('Resposta enviada!');

      await handleCheckQuestionAsAnswered(questionId);
    },
    [handleCheckQuestionAsAnswered]
  );

  if (!loadedRoom) {
    return <Loading />;
  }

  if (!isAdmin && loadedRoom) {
    return <Error title="Acesso negado. Você não é o adminstrador desta sala!" />;
  }

  if (ended && loadedRoom) {
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

      <Header isAdmin={isAdmin} handleEndRoom={handleEndRoom} code={roomId} />

      <PageRoom variants={stagger} initial="initial" animate="animate" exit={{ opacity: 0 }}>
        <motion.main variants={fadeInUp}>
          <div className="room-title">
            <h1>Sala {title}</h1>
            {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
          </div>

          {questions.length > 0 ? (
            <div className="question-and-answer-list">
              {questions.map((question) => (
                <Fragment key={question.id}>
                  <div className="question-container">
                    <Question
                      author={question.author}
                      content={question.content}
                      isAnswered={question.isAnswered}
                      isHighLighted={question.isHighLighted}
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
                          onClick={() => handleShowAnswerInput(question.id, question.isHighLighted)}
                          type="button"
                          whileTap={{
                            scale: 1.1,
                          }}
                          className="answer-button"
                        >
                          <FiMessageSquare size={24} />
                        </motion.button>
                      )}

                      <motion.button
                        type="button"
                        onClick={() => handleDeleteQuestion(question.id)}
                        whileTap={{
                          scale: 1.1,
                        }}
                        className="delete-button"
                      >
                        <FiTrash size={24} />
                      </motion.button>
                    </Question>
                  </div>

                  {showAnswerQuestion === question.id && (
                    <motion.form
                      onSubmit={(event: FormEvent) => handleAnswerQuestion(event, question.id)}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="answer-container-input"
                    >
                      <FiCornerDownRight size={24} color={pink.dark} />
                      <div>
                        <textarea
                          ref={textareaAnswerRef}
                          value={answer ?? ''}
                          onChange={(value) => {
                            setShowInputError(false);
                            setAnswer(value.target.value);
                          }}
                          style={
                            showInputError ? { boxShadow: `0 2px 12px rgba(215, 55, 84, 0.5)` } : {}
                          }
                        />

                        <Button>Responder</Button>
                      </div>
                    </motion.form>
                  )}

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

      {isActiveModal && <Overlay />}

      <Toaster />
    </>
  );
}
