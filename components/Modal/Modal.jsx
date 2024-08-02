import React from 'react';
import s from './Modal.module.css';
import Image from 'next/image';
import close from '../../icons/close.svg';
import { useEffect } from 'react';

import ReactDOM from 'react-dom';

const Modal = ({ show, onClose, children, style }) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'; // Заборонити прокручування сторінки
    } else {
      document.body.style.overflow = 'unset'; // Дозволити прокручування сторінки
    }

    return () => {
      document.body.style.overflow = 'unset'; // Повернути прокручування сторінки при закритті модального вікна
    };
  }, [show]);

  if (!show) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={s.modalOverlay} onClick={onClose}>
      <div
        className={s.modalContent}
        onClick={(e) => e.stopPropagation()}
        style={style}
      >
        <button className={s.modalClose} onClick={onClose}>
          <Image src={close} alt="close" />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
