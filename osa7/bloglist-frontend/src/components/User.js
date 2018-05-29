import React from 'react';
import PropTypes from 'prop-types';

const Blog = ({ user }) => {
  console.log(user);
  if (!user) return null;

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Added blogs</h2>
      <ul>
        {user.blogs.map(blog => {
          return (
            <li>
              {blog.title} by {blog.author}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Blog;
