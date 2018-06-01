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
    case 'GET_BLOG':
      return {
        ...state,
        blogs: state.blogs.map(
          blog => (blog._id === action.payload._id ? action.payload : blog)
        )
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

export function comment(id, comment) {
  return async dispatch => {
    const updatedBlog = (await axios.post(`/api/blogs/${id}/comments`, {
      comment
    })).data;
    dispatch({
      type: 'GET_BLOG',
      payload: updatedBlog
    });
  };
}
