import React from 'react';
import PropTypes from 'prop-types';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

const CreateBlogForm = props => (
  <Container>
    <Row>
      <Col>
        <Form onSubmit={props.handleAddNewBlog}>
          <FormGroup row>
            <Label for="newBlogTitle">title</Label>
            <Input
              value={props.newBlogTitle}
              name="newBlogTitle"
              onChange={props.handleInputFieldChange}
              id="newBlogTitle"
            />
          </FormGroup>
          <FormGroup row>
            <Label for="newBlogAuthor">author</Label>
            <Input
              value={props.newBlogAuthor}
              name="newBlogAuthor"
              onChange={props.handleInputFieldChange}
              id="newBlogAuthor"
            />
          </FormGroup>
          <FormGroup row>
            <Label for="newBlogUrl">url</Label>
            <Input
              value={props.newBlogUrl}
              name="newBlogUrl"
              onChange={props.handleInputFieldChange}
              id="newBlogUrl"
            />
          </FormGroup>
          <FormGroup row>
            <Button type="submit">create</Button>
          </FormGroup>
        </Form>
      </Col>
    </Row>
  </Container>
);

CreateBlogForm.propTypes = {
  handleAddNewBlog: PropTypes.func.isRequired,
  newBlogTitle: PropTypes.string.isRequired,
  newBlogAuthor: PropTypes.string.isRequired,
  newBlogUrl: PropTypes.string.isRequired,
  handleInputFieldChange: PropTypes.func.isRequired
};

export default CreateBlogForm;
