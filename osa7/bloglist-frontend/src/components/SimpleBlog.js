import React from 'react';

import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

const SimpleBlogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
};

const SimpleBlog = ({ blog }) => {
  if (!blog) return null;

  return (
    <Card>
      <CardBody>
        <CardTitle>{blog.title}</CardTitle>
        <CardText>
          {blog.title}
          {blog.author}
        </CardText>
      </CardBody>
    </Card>
  );
};

export default SimpleBlog;
