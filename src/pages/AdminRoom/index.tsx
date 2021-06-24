import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

import { database } from '../../services/firebase';

import { useHistory, useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useRoom } from '../../hooks/useRoom';

import { Header } from '../../components/Header';
import { Question } from '../../components/Question';
import { Loading } from '../../components/Loading';
import { Modal } from '../../components/Modal';
import { EmptyQuestion } from '../../components/EmptyQuestion';

import { Overlay, PageRoom } from './styles';
import { fadeInUp, stagger } from '../../styles/animation';

import deletedImg from '../../assets/images/delete.svg';
import checkImg from '../../assets/images/check.svg';
import answerImg from '../../assets/images/answer.svg';
import removeImg from '../../assets/images/remove.svg';

type IRoomParams = {
  id: string;
};

export function AdminRoom() {
  const { id: roomId } = useParams<IRoomParams>();
  const navigate = useHistory();

  const { purple } = useTheme();
  const { questions, loadedRoom, title, isAdmin } = useRoom(roomId);

  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);

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

  if (!loadedRoom) {
    return <Loading />;
  }

  if (!isAdmin) {
    navigate.push('/');
  }

  return (
    <>
      <Header isAdmin={isAdmin} handleEndRoom={handleEndRoom} code={roomId} />

      <PageRoom variants={stagger} initial="initial" animate="animate" exit={{ opacity: 0 }}>
        <motion.main variants={fadeInUp}>
          <div className="room-title">
            <h1>Sala {title}</h1>
            {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
          </div>

          {questions.length > 0 ? (
            <div className="question-list">
              {questions.map((question) => (
                <Question key={question.id} author={question.author} content={question.content}>
                  <motion.button
                    type="button"
                    whileTap={{
                      scale: 1.1,
                    }}
                    className="check-button"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12.0003"
                        cy="11.9998"
                        r="9.00375"
                        stroke="#737380"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193"
                        stroke="#737380"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>

                  <motion.button
                    type="button"
                    whileTap={{
                      scale: 1.1,
                    }}
                    className="answer-button"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z"
                        stroke="#737380"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={() => handleDeleteQuestion(question.id)}
                    whileTap={{
                      scale: 1.1,
                    }}
                    className="delete-button"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="delete"
                    >
                      <path
                        d="M3 5.99988H5H21"
                        stroke="#737380"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z"
                        stroke="#737380"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </motion.button>
                </Question>
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
