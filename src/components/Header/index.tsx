import { FiX, FiMenu } from 'react-icons/fi';

import { HeaderContainer } from './styles';

import logoDarkImg from '../../assets/images/logo-dark.svg';
import logoLightImg from '../../assets/images/logo-light.svg';

import copyImg from '../../assets/images/copy.svg';

import { useTheme } from 'styled-components';

import { Button } from '../Button';
import { HTMLMotionProps, motion } from 'framer-motion';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { SwitchTheme } from '../SwitchTheme';

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

type IHeader = HTMLMotionProps<'div'> & {
  code: string;
  handleEndRoom?: () => void;
  isAdmin?: boolean;
};

export function Header({ code, handleEndRoom, isAdmin = false }: IHeader) {
  const { name } = useTheme();
  const navigate = useHistory();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerHeight <= 900 ? true : false);

  useEffect(() => {
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  function checkIsMobile() {
    if (window.innerHeight <= 900) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);
  }

  function logout() {
    navigate.push('/');
  }

  return (
    <>
      <HeaderContainer
        style={
          isMobile && isOpen
            ? {
                position: 'absolute',
                width: '100%',
                height: '100vh',
                flexDirection: 'column',
                padding: '1rem 2rem',
                zIndex: 9999999,
              }
            : isMobile
            ? {
                flexDirection: 'column',
                padding: '1rem 2rem',
              }
            : {}
        }
        variants={container}
      >
        <header>
          <motion.img
            variants={item}
            src={name === 'dark' ? logoDarkImg : logoLightImg}
            alt="Letmeask"
          />

          <motion.div className="links-desktop" initial="hidden" animate="visible">
            <SwitchTheme />

            <Button onClick={copyRoomCodeToClipboard} className="room-code" variants={item}>
              <div>
                <img src={copyImg} alt="Copy room code" />
              </div>
              <span>Sala #{code}</span>
            </Button>

            {isAdmin ? (
              <Button onClick={handleEndRoom} variants={item}>
                Encerrar sala
              </Button>
            ) : (
              <Button onClick={logout} variants={item}>
                Sair da sala
              </Button>
            )}
          </motion.div>

          <div onClick={() => setIsOpen((oldstate) => !oldstate)} className="menu-mobile">
            {isOpen && isMobile ? (
              <FiX color="#fff" size={24} />
            ) : (
              <FiMenu color="#fff" size={24} />
            )}
          </div>
        </header>

        {isOpen && isMobile && (
          <div className="mobile-content">
            <Button onClick={copyRoomCodeToClipboard} className="room-code" variants={item}>
              <div>
                <img src={copyImg} alt="Copy room code" />
              </div>
              <span>Sala #{code}</span>
            </Button>

            {isAdmin ? (
              <Button onClick={handleEndRoom} variants={item}>
                Encerrar sala
              </Button>
            ) : (
              <Button onClick={logout} variants={item}>
                Sair da sala
              </Button>
            )}

            <SwitchTheme style={{ alignSelf: 'flex-start' }} />
          </div>
        )}
      </HeaderContainer>
    </>
  );
}
