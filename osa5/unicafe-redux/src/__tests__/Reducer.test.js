import deepFreeze from 'deep-freeze';
import counterReducer from '../reducer';

const f = x => typeof x;
console.log(`What is the difference between ${f()} and ${f(f)}?`);

describe('unicafe reducer', () => {
  const initialState = {
    positive: 0,
    neutral: 0,
    bad: 0,
    count: 0
  };

  it('should return a proper initial state when called with undefined state', () => {
    const state = {};
    const action = {
      type: 'DO_NOTHING'
    };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  it('positive is incremented', () => {
    const action = {
      type: 'INCREMENT'
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      positive: 1,
      neutral: 0,
      bad: 0,
      count: 1
    });
  });

  it('bad is incremented', () => {
    const action = {
      type: 'DECREMENT'
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      positive: 0,
      neutral: 0,
      bad: 1,
      count: 1
    });
  });

  it('neutral is incremented', () => {
    const action = {
      type: 'NEUTRAL'
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      positive: 0,
      neutral: 1,
      bad: 0,
      count: 1
    });
  });

  it('clears all', () => {
    const action = {
      type: 'CLEAR'
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      positive: 0,
      neutral: 0,
      bad: 0,
      count: 0
    });
  });
});
