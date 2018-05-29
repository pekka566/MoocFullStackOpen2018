import React from 'react';
import Blogs from './Blogs';
import CreateBlogForm from './CreateBlogForm';
import blogService from '../services/blogs';
import { connect } from 'react-redux';
import { notify } from '../reducers/notifications';

class BlogsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newBlogAuthor: '',
      newBlogTitle: '',
      newBlogUrl: '',
      error: null
    };
  }

  handleInputFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleAddBlog = async event => {
    event.preventDefault();
    const blog = await blogService.create({
      title: this.state.newBlogTitle,
      author: this.state.newBlogAuthor,
      url: this.state.newBlogUrl,
      user: this.props.user
    });

    this.setState({
      newBlogAuthor: '',
      newBlogTitle: '',
      newBlogUrl: '',
      blogs: this.props.blogs.concat(blog)
    });

    const notification =
      'a new blog ' + blog.title + ' by' + blog.author + ' added';
    this.props.notify(notification);
  };

  handleLikeBlog = async (event, blog) => {
    event.preventDefault();
    const user = blog.user ? blog.user._id : null;
    try {
      const updateBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        user,
        likes: blog.likes + 1
      };

      const updatedBlog = await blogService.update(blog.id, updateBlog);
      const oldBlogs = this.props.blogs.filter(
        blog => blog.id !== updateBlog.id
      );

      this.setState({
        blogs: oldBlogs.concat(updatedBlog)
      });

      const notification = '"' + blog.title + '" updated successfully';
      this.props.notify(notification);
    } catch (exception) {
      console.error(exception);
      this.setState({
        error: 'Failed to update "' + blog.title + '"'
      });

      setTimeout(() => {
        this.setState({ error: null });
      }, 5000);
    }
  };

  render() {
    if (!this.props.user) return null;
    return (
      <div>
        <div>
          {this.state.error !== null && (
            <p style={{ color: 'red', border: '3px solid red' }}>
              {this.state.error}
            </p>
          )}
        </div>
        <div>
          <div>
            <h2>blogs</h2>
            <div>
              {this.props.notifications.map(notification => (
                <p
                  style={{ color: 'green', border: '3px solid green' }}
                  key={notification}
                >
                  {notification}
                </p>
              ))}
            </div>
            <Blogs
              blogs={this.props.blogs.sort(this.sortLikes)}
              handleLikeButton={this.handleLikeBlog}
            />
          </div>
          <div>
            <h3>create new</h3>
            <CreateBlogForm
              handleAddNewBlog={this.handleAddBlog}
              handleInputFieldChange={this.handleInputFieldChange}
              newBlogTitle={this.state.newBlogTitle}
              newBlogAuthor={this.state.newBlogAuthor}
              newBlogUrl={this.state.newBlogUrl}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    blogs: state.blogs.blogs,
    notifications: state.notifications.notifications
  };
}

const mapDispatchToProps = dispatch => {
  return {
    notify: message => {
      dispatch(notify(message, 5000));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogsContainer);
