import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  render() {
    return (
      <>
        {this.props.galleryList.map(item => (
          <li className={css.imageGalleryItem} key={item.id}>
            <img
              className={css.imageGalleryItemImage}
              id={item.id}
              src={item.webformatURL}
              alt={item.tags}
              onClick={this.props.onClick}
            />
          </li>
        ))}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  galleryList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};
