import React from 'react';
import { connect } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';

class AnecdoteList extends React.Component {
  render() {
    const { anecdotes, voteAnecdote } = this.props;
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.props.voteAnecdote(anecdote.id)}>
                vote
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const filteredAnecdotes = (anecdotes, filterSearchTerm) => {
  return anecdotes.filter(
    a => a.content.toLowerCase().indexOf(filterSearchTerm.toLowerCase()) !== -1
  );
};

const mapStateToProps = state => {
  return {
    anecdotes: filteredAnecdotes(state.anecdotes, state.filter)
  };
};

const mapDispatchToProps = {
  voteAnecdote
};

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(
  AnecdoteList
);

export default ConnectedAnecdoteList;
