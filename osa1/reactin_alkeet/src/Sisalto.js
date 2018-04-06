import React from 'react';

import Osa from './Osa';

const Sisalto = props => {
  const sisalto = props.osat.map(osa => (
    <Osa osa={osa.nimi} tehtavia={osa.tehtavia} key={osa.nimi} />
  ));

  return sisalto;
};

export default Sisalto;
