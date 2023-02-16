import { useEffect } from 'react';
import { Overlay, ModalWindow, Img } from './Modal.styled';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ largeSrc, altTags, onClose }) => {
  

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  useEffect(() => {

    const onModalClose = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onModalClose);

    return () => {
      window.removeEventListener('keydown', onModalClose);
    };
  }, [onClose]);


  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>
        <Img src={largeSrc} alt={altTags} />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  altTags: PropTypes.string.isRequired,
  largeSrc: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
