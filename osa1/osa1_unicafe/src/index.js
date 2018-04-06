import React from 'react';
import ReactDOM from 'react-dom';

// Button vastaa yksittäistä palautteenantonappia
const Button = props => {
  return <button onClick={props.clickHandler}>{props.children}</button>;
};

// Statistics huolehtii tilastojen näyttämisestä
const Statistics = props => {
  const { good, neutral, bad, average, positive } = props;
  const statistics =
    good + neutral + bad === 0 ? (
      'ei yhtään palautetta'
    ) : (
      <table>
        <thead>
          <tr>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          <Statistic key={1} value={good}>
            hyvä
          </Statistic>
          <Statistic key={2} value={neutral}>
            neutraali
          </Statistic>
          <Statistic key={3} value={bad}>
            huono
          </Statistic>
          <Statistic key={4} value={average}>
            keskiarvo
          </Statistic>
          <Statistic key={5} value={positive} unit="%">
            positiivisia
          </Statistic>
        </tbody>
      </table>
    );

  return (
    <div>
      <h1>statistiikka</h1>
      {statistics}
    </div>
  );
};

// Statistic huolehtii yksittäisen tilastorivin, esim. keskiarvon näyttämisestä
const Statistic = props => {
  return (
    <tr>
      <td>{props.children}</td>
      <td>
        {props.value} {props.unit}
      </td>
    </tr>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      good: 0,
      neutral: 0,
      bad: 0
    };

    this.calculateAverage = this.calculateAverage.bind(this);
    this.calculatePercent = this.calculatePercent.bind(this);
  }

  calculateAverage() {
    const { good, neutral, bad } = this.state;
    const numOfAnswers = good + bad + neutral;
    return numOfAnswers === 0
      ? 0
      : (good / numOfAnswers - bad / numOfAnswers).toFixed(2);
  }

  calculatePercent() {
    const { good, neutral, bad } = this.state;
    const numOfAnswers = good + bad + neutral;
    return numOfAnswers === 0 ? 0 : (good / numOfAnswers * 100).toFixed(2);
  }

  render() {
    const { good, neutral, bad } = this.state;
    return (
      <div>
        <h1>anna palautetta</h1>
        <Button clickHandler={() => this.setState({ good: good + 1 })}>
          hyvä
        </Button>
        <Button clickHandler={() => this.setState({ neutral: neutral + 1 })}>
          neutraali
        </Button>
        <Button clickHandler={() => this.setState({ bad: bad + 1 })}>
          huono
        </Button>
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          average={this.calculateAverage()}
          positive={this.calculatePercent()}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
