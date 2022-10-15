import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ onClick }) => {
  return (
    <>
      <button className={css.button} onClick={onClick}>
        Load more
      </button>
    </>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
