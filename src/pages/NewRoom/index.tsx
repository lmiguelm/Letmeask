import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { motion } from 'framer-motion';

import illustrationImg from '../../assets/images/illustration.svg';
import logoDarkImg from '../../assets/images/logo-dark.svg';
import logoLightImg from '../../assets/images/logo-light.svg';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { PageNewRoom } from './styles';
import { fadeInUp, stagger } from '../../styles/animation';

export function NewRoom() {
  const { name } = useTheme();

  const [messageError, setMessageError] = useState<string>();

  async function handleSubmitForm(event: FormEvent) {
    event.preventDefault();
    setMessageError('Nome inválido');
  }

  return (
    <PageNewRoom variants={stagger} initial="initial" animate="animate" exit={{ opacity: 0 }}>
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

          <form onSubmit={handleSubmitForm}>
            <Input type="text" placeholder="Nome da sala" errorMessage={messageError} />
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
