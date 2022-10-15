import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = props => {
  const { galleryList, activeImgId, onClose } = props;

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose(e);
    }
  };

  const activeImg = galleryList.find(img => img.id === Number(activeImgId));

  return (
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <img
          className={css.modalImg}
          src={activeImg.largeImageURL}
          alt={activeImg.tags}
        />
      </div>
    </div>
  );
};

Modal.propTypes = {
  galleryList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  activeImgId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
