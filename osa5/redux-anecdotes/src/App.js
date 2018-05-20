import React from 'react';
import actionFor from './actions';

class App extends React.Component {
  addAnecdote = event => {
    event.preventDefault();
    console.log(event.target);
    this.props.store.dispatch(
      actionFor.anecdoteCreation(event.target.anecdote.value)
    );
    event.target.anecdote.value = '';
  };

  vote = id => () => {
    this.props.store.dispatch(actionFor.vote(id));
  };

  render() {
    const { store } = this.props;
    const anecdotes = store.getState();
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div>
            <input name="anecdote" />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    );
  }
}

export default App;
