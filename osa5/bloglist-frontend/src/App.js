import React from 'react';
import Blog from './components/Blog';
import CreateBlogForm from './components/CreateBlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      newBlogAuthor: '',
      newBlogTitle: '',
      newBlogUrl: '',
      notification: null,
      error: null,
      visible: false
    };
  }

  componentDidMount() {
    blogService.getAll().then(blogs => this.setState({ blogs }));

    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      this.setState({ user });
      blogService.setToken(user.token);
    }
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
      user: this.state.user
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

  login = async event => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      this.setState({ username: '', password: '', user });
    } catch (exception) {
      console.log(exception);
      this.setState({ error: 'wrong username or password' });
      setTimeout(() => {
        this.setState({ error: null });
      }, 5000);
    }
  };

  logout = () => {
    console.log('logout');
    window.localStorage.removeItem('loggedUser');
    window.localStorage.clear();
    this.setState({ user: null });
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

  sortLikes = (a, b) => {
    if (a.likes > b.likes) {
      return -1;
    }
    if (a.likes < b.likes) {
      return 1;
    }
    return 0;
  };

  render() {
    const loginForm = () => {
      const hideWhenVisible = {
        display: this.state.visible ? 'none' : ''
      };
      const showWhenVisible = {
        display: this.state.visible ? '' : 'none'
      };

      return (
        <div>
          <Togglable
            buttonLabel="log in"
            ref={component => (this.loginForm = component)}
          >
            <LoginForm
              visible={this.state.visible}
              username={this.state.username}
              password={this.state.password}
              handleChange={this.handleInputFieldChange}
              handleSubmit={this.login}
            />
          </Togglable>
        </div>
      );
    };

    const blogs = () => (
      <div>
        <div>
          <h2>blogs</h2>
          {notifications()}
          <div>
            {this.state.user.username} logged in{' '}
            <button onClick={this.logout}>logout</button>
          </div>
          {this.state.blogs
            .sort(this.sortLikes)
            .map(blog => (
              <Blog
                key={blog._id}
                blog={blog}
                handleLikeButton={this.handleLikeBlog}
              />
            ))}
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
    );

    const notifications = () => (
      <div>
        {this.state.notification !== null && (
          <p style={{ color: 'green', border: '3px solid green' }}>
            {this.state.notification}
          </p>
        )}
      </div>
    );

    const erras = () => (
      <div>
        {this.state.error !== null && (
          <p style={{ color: 'red', border: '3px solid red' }}>
            {this.state.error}
          </p>
        )}
      </div>
    );

    return (
      <div>
        {erras()}

        {this.state.user === null ? loginForm() : blogs()}
      </div>
    );
  }
}

export default App;
