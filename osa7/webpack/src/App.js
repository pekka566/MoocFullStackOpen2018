import React from 'react';
import './index.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 0
    };
  }

  render() {
    return (
      <div className="container">
        <p>hello webpack {this.state.counter} clicks</p>
        <button
          onClick={() => this.setState({ counter: this.state.counter + 1 })}
        >
          click
        </button>
      </div>
    );
  }
}

export default App;
