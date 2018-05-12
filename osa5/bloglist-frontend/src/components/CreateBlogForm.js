import React from 'react';

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

export default CreateBlogForm;
