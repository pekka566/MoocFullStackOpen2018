import React from 'react';
import Blog from './Blog';
import CreateBlogForm from './CreateBlogForm';

const notifications = notification => (
  <div>
    {notification !== null && (
      <p style={{ color: 'green', border: '3px solid green' }}>
        {notification}
      </p>
    )}
  </div>
);

const Blogs = props => {
  const sortLikes = (a, b) => {
    if (a.likes > b.likes) {
      return -1;
    }
    if (a.likes < b.likes) {
      return 1;
    }
    return 0;
  };

  return (
    <div>
      test
      {props.blogs
        .sort(sortLikes)
        .map(blog => (
          <Blog
            key={blog._id}
            blog={blog}
            handleLikeButton={props.handleLikeButton}
          />
        ))}
    </div>
  );
};

export default Blogs;
