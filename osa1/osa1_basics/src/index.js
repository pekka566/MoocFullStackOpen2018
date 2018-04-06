import React from 'react';
import ReactDOM from 'react-dom';

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
      {props.osat[0].tehtavia + props.osat[1].tehtavia + props.osat[2].tehtavia}{' '}
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

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  };

  return (
    <div>
      <Otsikko kurssi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
      <Yhteensa osat={kurssi.osat} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
