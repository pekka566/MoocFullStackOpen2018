import React from 'react';

import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Input,
  Button,
  Form
} from 'reactstrap';

const SimpleBlog = props => {
  const { blog, handleChange, handleSubmit } = props;

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
          <Form
            onSubmit={e => {
              e.preventDefault();
              handleSubmit(blog.id, this.input.value);
            }}
          >
            <Input
              name="newComment"
              onChange={handleChange}
              id="newComment"
              innerRef={i => {
                this.input = i;
              }}
            />
            <Button type="submit">add</Button>
          </Form>
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
