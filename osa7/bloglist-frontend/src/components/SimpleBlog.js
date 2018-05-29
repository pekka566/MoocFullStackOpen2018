import React from 'react';

const SimpleBlogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
};

const SimpleBlog = ({ blog }) => {
  return (
    <div style={SimpleBlogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
    </div>
  );
};

export default SimpleBlog;
