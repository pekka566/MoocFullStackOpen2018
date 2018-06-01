import React from 'react';
import { Link } from 'react-router-dom';

import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

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
        <Card key={blog.id}>
          <CardBody>
            <CardTitle>{blog.title}</CardTitle>
            <CardText>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} {blog.author}
              </Link>
            </CardText>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default Blogs;
