import React from 'react';

const Yhteensa = props => {
  return (
    <p>
      yhteensä{' '}
      {props.osat[0].tehtavia + props.osat[1].tehtavia + props.osat[2].tehtavia}{' '}
      tehtävää
    </p>
  );
};

export default Yhteensa;
