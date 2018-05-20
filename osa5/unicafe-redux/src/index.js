import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import counterReducer from './reducer';

const store = createStore(counterReducer);

const Statistiikka = props => {
  const { count, positive, neutral, bad } = props.palautteita;

  console.log(props, count);

  if (count === 0) {
    return (
      <div>
        <h2>Statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    );
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{positive}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>hyviä</td>
            <td>{positive / count * 100} %</td>
          </tr>
        </tbody>
      </table>

      <button onClick={props.nollaa}>nollaa tilasto</button>
    </div>
  );
};

export class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h2>Anna palautetta</h2>
          <button onClick={e => store.dispatch({ type: 'INCREMENT' })}>
            plus
          </button>
          <button onClick={e => store.dispatch({ type: 'DECREMENT' })}>
            minus
          </button>
          <button onClick={e => store.dispatch({ type: 'NEUTRAL' })}>
            neutraali
          </button>
        </div>
        <div>
          <Statistiikka
            palautteita={store.getState()}
            nollaa={e => store.dispatch({ type: 'CLEAR' })}
          />
        </div>
      </div>
    );
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);
