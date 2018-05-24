const initialState = { notification: 'This is the initial state!' };

const notificationReducer = (store = initialState, action) => {
  switch (action.type) {
    case 'ACTIVATE_NOTIFICATION':
      return { notification: action.text };
    case 'DEACTIVATE_NOTIFICATION':
      return { notification: '' };
    default:
      return store;
  }
};

export const notify = notification => {
  return async dispatch => {
    await dispatch({
      type: 'ACTIVATE_NOTIFICATION',
      text: notification
    });

    setTimeout(() => {
      dispatch({
        type: 'DEACTIVATE_NOTIFICATION'
      });
    }, 5000);
  };
};
export default notificationReducer;
