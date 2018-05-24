import React from 'react';
import { connect } from 'react-redux';
import { createContent } from '../reducers/anecdoteReducer';
import { notify } from '../reducers/notificationReducer';

class AnecdoteForm extends React.Component {
  handleSubmit = async e => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    this.props.createContent(content);
    this.props.notify(content);
    e.target.anecdote.value = '';
  };
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input name="anecdote" />
          </div>
          <button>create</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    store: state
  };
};

const mapDispatchToProps = {
  createContent,
  notify
};

const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(
  AnecdoteForm
);

export default ConnectedAnecdoteForm;
