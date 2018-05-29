import React from 'react';
import PropTypes from 'prop-types';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
};

const Blog = props => {
  const { blog, handleLikeButton } = props;
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <div>
        {blog.likes} likes
        <button onClick={event => handleLikeButton(event, blog)}>like</button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
};

export default Blog;
