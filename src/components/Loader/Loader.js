import { Component } from 'react';
import PropTypes from 'prop-types';
import FadeLoader from 'react-spinners/FadeLoader';

export class Loader extends Component {
  render() {
    const override = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      // transform: 'translate(-50%, -50%)',
      display: 'block',
      margin: '0 auto',
      borderColor: 'red',
    };

    return (
      <>
        <FadeLoader
          color="red"
          loading={this.props.isLoading}
          cssOverride={override}
          size={450}
          aria-label="Loading Gallery"
        />
      </>
    );
  }
}

Loader.propType = {
  isLoading: PropTypes.bool.isRequired,
};
