import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { motion } from 'framer-motion';

import illustrationImg from '../../assets/images/illustration.svg';
import logoDarkImg from '../../assets/images/logo-dark.svg';
import logoLightImg from '../../assets/images/logo-light.svg';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { PageNewRoom } from './styles';
import { fadeInUp, stagger } from '../../styles/animation';

import { database } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';
import { Helmet } from 'react-helmet';

export function NewRoom() {
  const { name } = useTheme();
  const { user } = useAuth();
  const navigate = useHistory();

  const [newRoom, setNewRoom] = useState<string>();
  const [messageError, setMessageError] = useState<string>();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (!newRoom || newRoom.trim() === '') {
      setMessageError('Nome inválido');
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    navigate.push(`/admin/rooms/${firebaseRoom.key}`);
  }

  return (
    <PageNewRoom variants={stagger} initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <Helmet>
        <title>Nova sala</title>
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

          <h2>Criar uma nova sala</h2>

          <form onSubmit={handleCreateRoom}>
            <Input
              value={newRoom}
              onChange={(event) => {
                if (messageError) {
                  setMessageError(undefined);
                }

                setNewRoom(event.target.value);
              }}
              type="text"
              placeholder="Nome da sala"
              errorMessage={messageError}
            />

            <Button type="submit">Criar sala</Button>
          </form>

          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </motion.main>
    </PageNewRoom>
  );
}
