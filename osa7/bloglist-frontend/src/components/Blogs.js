import React from 'react';
import { Link } from 'react-router-dom';
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

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
};

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
      {props.blogs.sort(sortLikes).map(blog => (
        <div style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}
            {blog.author}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
