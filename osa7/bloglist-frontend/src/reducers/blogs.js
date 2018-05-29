import axios from 'axios';

export default function reducer(
  state = { blogs: [], form: { title: '', author: '', url: '' } },
  action
) {
  switch (action.type) {
    case 'GET_BLOGS':
      return {
        ...state,
        blogs: action.payload
      };
    default:
      return state;
  }
}

export function getBlogs() {
  return async dispatch => {
    const blogs = (await axios.get('/api/blogs')).data;
    dispatch({
      type: 'GET_BLOGS',
      payload: blogs
    });
  };
}
