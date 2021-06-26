import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import Helmet from 'react-helmet';

import illustrationImg from '../../assets/images/illustration.svg';
import logInImg from '../../assets/images/log-in.svg';
import googleIconImg from '../../assets/images/google-icon.svg';
import logoDarkImg from '../../assets/images/logo-dark.svg';
import logoLightImg from '../../assets/images/logo-light.svg';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from 'styled-components';

import { PageAuth } from './styles';
import { fadeInUp, stagger } from '../../styles/animation';
import { FormEvent, useState } from 'react';
import { database } from '../../services/firebase';
import { SwitchTheme } from '../../components/SwitchTheme';

export function Home() {
  const naviagte = useHistory();

  const { user, signinWithGoogle } = useAuth();
  const { name } = useTheme();

  const [room, setRoom] = useState<string>();
  const [messageError, setMessageError] = useState<string>();

  async function handleCreateRoom() {
    if (!user) {
      await signinWithGoogle();
    }
    naviagte.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (!room || room.trim() == '') {
      setMessageError('Campo obrigatório.');
      return;
    }

    const roomRef = await database.ref(`rooms/${room}`).get();

    if (!roomRef.exists()) {
      setMessageError('Sala inexistente.');
      return;
    }

    if (roomRef.val().endedAt) {
      setMessageError('Sala encerrada');
      return;
    }

    naviagte.push(`/rooms/${room}`);
  }

  return (
    <PageAuth variants={stagger} initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <aside>
        <motion.img
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Cria salas de Q&amp;A ao-vivo</strong>
        <p>Tira as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <motion.main variants={fadeInUp}>
        <div className="main-content">
          <img src={name == 'dark' ? logoDarkImg : logoLightImg} alt="Letmeask" />

          <Button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Cria sua sala com o google
          </Button>

          <div className="separator">ou entre em uma sala</div>

          <form onSubmit={handleJoinRoom}>
            <Input
              value={room}
              onChange={(event) => {
                if (messageError) {
                  setMessageError(undefined);
                }

                setRoom(event.target.value);
              }}
              type="text"
              placeholder="Digite o código da sala"
              errorMessage={messageError}
            />

            <Button type="submit">
              <img src={logInImg} alt="Logo de Login" />
              Entrar na sala
            </Button>
          </form>

          <div className="theme-container">
            <SwitchTheme />
          </div>
        </div>
      </motion.main>
    </PageAuth>
  );
}
