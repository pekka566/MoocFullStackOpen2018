import React from 'react';
import PropTypes from 'prop-types';

const Osa = props => {
  return (
    <p>
      {props.osa} {props.tehtavia}
    </p>
  );
};

Osa.propTypes = {
  osa: PropTypes.string.isRequired,
  tehtavia: PropTypes.number.isRequired
};

export default Osa;
