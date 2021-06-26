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
  isHighLighted: boolean;
  isAnswered: boolean;
  likeCount: number;
  likeId: string | undefined;
  answers: Array<{
    author: {
      name: string;
      avatar: string;
    };
    content: string;
  }>;
};

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isHighLighted: boolean;
    isAnswered: boolean;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
    likeId: string | undefined;
    answers: Record<
      string,
      {
        author: {
          name: string;
          avatar: string;
        };
        content: string;
      }
    >;
  }
>;

export function useRoom(roomId: string) {
  const { user } = useAuth();

  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [title, setTitle] = useState<string>();
  const [isAdmin, setIsAdmin] = useState<boolean>();
  const [ended, setEnded] = useState<string>();

  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', (room) => {
      const databaseRoom = room.val();

      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const title = databaseRoom.title as string;
      const roomAdmin = databaseRoom.authorId as string;
      const ended = databaseRoom.endedAt;
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighLighted: value.isHighLighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(
            ([key, like]) => like.authorId === user?.id
          )?.[0],
          answers: Object.entries(value.answers ?? {}).map(([key, value]) => {
            return {
              id: key,
              author: value.author,
              content: value.content,
            };
          }),
        };
      });

      setQuestions(
        parsedQuestions
          .sort((a, b) => {
            if (a.likeCount >= b.likeCount) {
              return -1;
            } else {
              return 1;
            }
          })
          .sort((a) => {
            if (!a.isAnswered) {
              return -1;
            } else {
              return 1;
            }
          })
      );
      setIsAdmin(roomAdmin === user?.id);
      setEnded(ended);
      setLoaded(true);
      setTitle(title);
    });

    return () => roomRef.off('value');
  }, [roomId, user?.id]);

  return {
    loadedRoom: loaded,
    title,
    questions,
    isAdmin,
    ended,
  };
}
