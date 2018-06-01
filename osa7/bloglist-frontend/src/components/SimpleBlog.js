import React from 'react';

import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem
} from 'reactstrap';

const SimpleBlog = ({ blog }) => {
  if (!blog) return null;

  return (
    <Card>
      <CardBody>
        <CardTitle>{blog.title}</CardTitle>
        <CardText>
          {blog.title} {blog.author}
        </CardText>
        <h5>comments</h5>
        <div>
          {' '}
          <ListGroup>
            {blog.comments.map((comment, i) => (
              <ListGroupItem key={i}>{comment}</ListGroupItem>
            ))}
          </ListGroup>
        </div>
      </CardBody>
    </Card>
  );
};

export default SimpleBlog;
