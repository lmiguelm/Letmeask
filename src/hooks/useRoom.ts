import { useEffect, useState } from 'react';
import { database } from '../services/firebase';
import { useAuth } from './useAuth';

type IQuestion = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isHighLighted: string;
  isAnswer: string;
  likeCount: number;
  likeId: string | undefined;
};

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
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
    likeId: string | undefined;
  }
>;

export function useRoom(roomId: string) {
  const { user } = useAuth();

  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [title, setTitle] = useState<string>();
  const [isAdmin, setIsAdmin] = useState<boolean>();

  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', (room) => {
      const databaseRoom = room.val();

      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const roomAdmin = databaseRoom.authorId as string;
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighLighted: value.isHighLighted,
          isAnswer: value.isAnswer,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(
            ([key, like]) => like.authorId === user?.id
          )?.[0],
        };
      });

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
      setIsAdmin(roomAdmin === user?.id);
      setLoaded(true);
    });

    return () => roomRef.off('value');
  }, [roomId, user?.id]);

  return {
    loadedRoom: loaded,
    title,
    questions,
    isAdmin,
  };
}
