'use client';

import { ReactNode, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import css from './Modal.module.css';

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

const Modal = ({ children, onClose }: ModalProps) => {
  const close = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [close]);

  return ReactDOM.createPortal(
    <div
      className={css.backdrop}
      onClick={close}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        {children}
        <button onClick={close}>Close</button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
