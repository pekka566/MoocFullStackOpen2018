import React from 'react';
import Blogs from './Blogs';
import CreateBlogForm from './CreateBlogForm';
import blogService from '../services/blogs';

class BlogsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      newBlogAuthor: '',
      newBlogTitle: '',
      newBlogUrl: '',
      notification: null,
      error: null
    };
  }

  componentDidMount() {
    blogService.getAll().then(blogs => this.setState({ blogs }));
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

    console.log(blog);

    this.setState({
      newBlogAuthor: '',
      newBlogTitle: '',
      newBlogUrl: '',
      notification: "a new blog ' + blog.title + ' by + blog.author + added",
      blogs: this.state.blogs.concat(blog)
    });

    setTimeout(() => {
      this.setState({ notification: null });
    }, 5000);
  };

  handleLikeBlog = async (event, blog) => {
    event.preventDefault();
    console.log(blog);
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
      const oldBlogs = this.state.blogs.filter(
        blog => blog.id !== updateBlog.id
      );

      this.setState({
        blogs: oldBlogs.concat(updatedBlog),
        notification: '"' + blog.title + '" updated successfully'
      });

      setTimeout(() => {
        this.setState({ notification: null });
      }, 5000);
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
              {this.state.notification !== null && (
                <p style={{ color: 'green', border: '3px solid green' }}>
                  {this.state.notification}
                </p>
              )}
            </div>
            <Blogs
              blogs={this.state.blogs.sort(this.sortLikes)}
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

export default BlogsContainer;
