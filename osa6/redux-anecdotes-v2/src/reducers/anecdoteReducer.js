import { createNew } from '../services/anecdotes';
import anecdoteService from '../services/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  };
};

export const voteAnecdote = voted => {
  return async dispatch => {
    const content = await anecdoteService.registerVote(
      voted.id,
      voted.votes + 1
    );
    dispatch({
      type: 'VOTE',
      id: content.id,
      voted: { ...voted, votes: content.votes }
    });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    });
  };
};

export const anecdoteInitialization = data => {
  return {
    type: 'INIT_ANECDOTES',
    data
  };
};

export const createContent = anecdote => {
  return async dispatch => {
    const content = await createNew(anecdote);
    dispatch({
      type: 'CREATE',
      content
    });
  };
};

const reducer = (store = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const olds = store.filter(a => a.id !== action.id);

      return [...olds, action.voted];

    case 'CREATE':
      return [...store, action.content];

    case 'INIT_ANECDOTES':
      return action.data;

    default:
      return store;
  }
};

export default reducer;
