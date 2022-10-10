import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  render() {
    if (this.props.galleryList === []) {
      return;
    }
    return (
      <ul className={css.imageGallery}>
        <ImageGalleryItem
          galleryList={this.props.galleryList}
          onClick={this.props.onClick}
        />
      </ul>
    );
  }
}

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
