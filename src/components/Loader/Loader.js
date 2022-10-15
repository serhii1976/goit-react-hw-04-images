import React from 'react';
import PropTypes from 'prop-types';
import FadeLoader from 'react-spinners/FadeLoader';

export const Loader = ({ isLoading }) => {
  const override = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
  };

  return (
    <>
      <FadeLoader
        color="red"
        loading={isLoading}
        cssOverride={override}
        size={450}
        aria-label="Loading Gallery"
      />
    </>
  );
};

Loader.propType = {
  isLoading: PropTypes.bool.isRequired,
};
