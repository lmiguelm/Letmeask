import { useEffect } from 'react';
import { createContext, ReactNode, useCallback, useState } from 'react';

import { auth, firebase } from '../services/firebase';

type IUser = {
  avatar: string;
  id: string;
  name: string;
};

type IAuthContext = {
  user: IUser | undefined;
  signinWithGoogle: () => Promise<void>;
};

export const AuthContext = createContext({} as IAuthContext);

type IAuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account');
        }

        setUser({ name: displayName, avatar: photoURL, id: uid });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signinWithGoogle = useCallback(async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    const { user } = await auth.signInWithPopup(provider);

    if (user) {
      const { displayName, photoURL, uid } = user;

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account');
      }

      setUser({ name: displayName, avatar: photoURL, id: uid });
    }
  }, []);

  return <AuthContext.Provider value={{ user, signinWithGoogle }}>{children}</AuthContext.Provider>;
}
