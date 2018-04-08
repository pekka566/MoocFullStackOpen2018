import React from 'react';

const Otsikko = props => {
  return <h1>{props.kurssi}</h1>;
};

const Sisalto = props => {
  const sisalto = props.osat.map(osa => (
    <Osa osa={osa.nimi} tehtavia={osa.tehtavia} key={osa.nimi} />
  ));

  return sisalto;
};

const Yhteensa = props => {
  return (
    <p>
      yhteensä{' '}
      {props.osat.map(osa => osa.tehtavia).reduce((teht, cur) => teht + cur)}{' '}
      tehtävää
    </p>
  );
};

const Osa = props => {
  return (
    <p>
      {props.osa} {props.tehtavia}
    </p>
  );
};

const Kurssi = props => {
  const { kurssit } = props;
  const kurssilista = kurssit.map(kurssi => (
    <div key={kurssi.id}>
      <Otsikko kurssi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
      <Yhteensa osat={kurssi.osat} />
    </div>
  ));
  return <div>{kurssilista}</div>;
};

export default Kurssi;
