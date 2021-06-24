import { Modal as ModalComponent } from './styles';

import { Button } from '../Button';
import { ReactNode } from 'react';

type IModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
  children: ReactNode;
};

export function Modal({ onConfirm, onCancel, children }: IModalProps) {
  return (
    <ModalComponent
      initial={{
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.4,
      }}
    >
      {children}

      <div className="buttons-container">
        <Button onClick={onCancel}>Cancelar</Button>
        <Button onClick={onConfirm}>Confirmar</Button>
      </div>
    </ModalComponent>
  );
}
