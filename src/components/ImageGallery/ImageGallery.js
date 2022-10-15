import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ galleryList, onClick }) => {
  if (galleryList === []) {
    return;
  }
  return (
    <ul className={css.imageGallery}>
      <ImageGalleryItem galleryList={galleryList} onClick={onClick} />
    </ul>
  );
};

ImageGallery.propTypes = {
  galleryList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};
