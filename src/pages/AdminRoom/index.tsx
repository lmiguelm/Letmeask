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

import { Overlay, PageRoom } from './styles';
import { fadeInUp, stagger } from '../../styles/animation';

import deletedImg from '../../assets/images/delete.svg';
import removeImg from '../../assets/images/remove.svg';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

type IRoomParams = {
  id: string;
};

export function AdminRoom() {
  const { id: roomId } = useParams<IRoomParams>();
  const navigate = useHistory();

  const { purple } = useTheme();
  const { questions, loadedQuestions, title } = useRoom(roomId);

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

  if (!loadedQuestions) {
    return <Loading />;
  }

  return (
    <>
      <Header handleEndRoom={handleEndRoom} code={roomId} />

      <PageRoom variants={stagger} initial="initial" animate="animate" exit={{ opacity: 0 }}>
        <motion.main variants={fadeInUp}>
          <div className="room-title">
            <h1>Sala {title}</h1>
            {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
          </div>

          <div className="question-list">
            {questions.map((question) => (
              <Question key={question.id} author={question.author} content={question.content}>
                <motion.button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                  whileTap={{
                    scale: 1.1,
                  }}
                >
                  <img src={deletedImg} alt="Remover pergunta" />
                </motion.button>
              </Question>
            ))}
          </div>
        </motion.main>
      </PageRoom>

      {isActiveModal && <Overlay />}

      <Toaster />
    </>
  );
}
