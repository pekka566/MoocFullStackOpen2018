const initialState = {
  count: 0,
  positive: 0,
  neutral: 0,
  bad: 0
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1, positive: state.positive + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count + 1, bad: state.bad + 1 };
    case 'NEUTRAL':
      return { ...state, count: state.count + 1, neutral: state.neutral + 1 };
    case 'CLEAR':
      return {
        count: 0,
        positive: 0,
        neutral: 0,
        bad: 0
      };
  }

  return state;
};

export default counterReducer;
