import React from 'react';
import PropTypes from 'prop-types';

const CreateBlogForm = props => (
  <form onSubmit={props.handleAddNewBlog}>
    <div>
      <div>
        title{' '}
        <input
          value={props.newBlogTitle}
          name="newBlogTitle"
          onChange={props.handleInputFieldChange}
        />
      </div>
      <div>
        author{' '}
        <input
          value={props.newBlogAuthor}
          name="newBlogAuthor"
          onChange={props.handleInputFieldChange}
        />
      </div>
      <div>
        url{' '}
        <input
          value={props.newBlogUrl}
          name="newBlogUrl"
          onChange={props.handleInputFieldChange}
        />
      </div>
      <button type="submit">create</button>
    </div>
  </form>
);

CreateBlogForm.propTypes = {
  handleAddNewBlog: PropTypes.func.isRequired,
  newBlogTitle: PropTypes.string.isRequired,
  newBlogAuthor: PropTypes.string.isRequired,
  newBlogUrl: PropTypes.string.isRequired,
  handleInputFieldChange: PropTypes.func.isRequired
};

export default CreateBlogForm;
