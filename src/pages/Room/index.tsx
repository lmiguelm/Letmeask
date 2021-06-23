import { FormEvent, useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';

import { PageRoom } from './styles';
import { database } from '../../services/firebase';
import { fadeInUp, stagger } from '../../styles/animation';
import { motion } from 'framer-motion';
import { Loading } from '../../components/Loading';
import { useTheme } from 'styled-components';

interface IRoomParams {
  id: string;
}

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isHighLighted: string;
    isAnswer: string;
  }
>;

interface IQuestion {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isHighLighted: string;
  isAnswer: string;
}

export function Room() {
  const { id: roomId } = useParams<IRoomParams>();
  const { user } = useAuth();
  const { danger, details, text } = useTheme();

  const [newQuestion, setNewQuestion] = useState<string>();
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [title, setTitle] = useState<string>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [showiInputError, setShowInputError] = useState<boolean>(false);

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighLighted: value.isHighLighted,
          isAnswer: value.isAnswer,
        };
      });

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
      setLoaded(true);
    });
  }, [roomId]);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (!newQuestion || newQuestion.trim() === '') {
      toast.error('Insira uma pergunta!');
      setShowInputError(true);
      return;
    }

    if (!user) {
      toast.error('Você precisa estar logado para fazer uma pergunta!');
      setShowInputError(true);
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
      setShowInputError(true);
    } finally {
      setNewQuestion('');
    }
  }

  if (!loaded) {
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
              style={showiInputError ? { border: `1px solid ${danger.normal}` } : {}}
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
        </motion.main>
      </PageRoom>

      <Toaster
        toastOptions={{ style: { background: details, color: text.primary } }}
        position="bottom-right"
        reverseOrder={false}
      ></Toaster>
    </>
  );
}
