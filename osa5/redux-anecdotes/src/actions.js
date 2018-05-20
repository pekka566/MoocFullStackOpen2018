const actionFor = {
  anecdoteCreation(anecdote) {
    return {
      type: 'CREATE_NEW',
      anecdote
    };
  },
  vote(id) {
    return {
      type: 'VOTE',
      id
    };
  }
};

export default actionFor;
