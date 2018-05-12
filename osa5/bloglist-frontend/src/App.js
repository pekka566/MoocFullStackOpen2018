import React from 'react';
import Blog from './components/Blog';
import CreateBlogForm from './components/CreateBlogForm';
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
      notification: ''
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
      notification: '"' + blog.title + '" added successfully',
      blogs: this.state.blogs.concat(blog)
    });
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
      // ...
    }
  };

  logout = () => {
    console.log('logout');
    window.localStorage.removeItem('loggedUser');
    window.localStorage.clear();
    this.setState({ user: null });
  };

  render() {
    const loginForm = () => (
      <div>
        <h2>Log in to application</h2>

        <form onSubmit={this.login}>
          <div>
            username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInputFieldChange}
            />
          </div>
          <div>
            password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputFieldChange}
            />
          </div>
          <button>login</button>
        </form>
      </div>
    );

    const blogs = () => (
      <div>
        <div>
          <h2>blogs</h2>
          <div>
            {this.state.user.username} logged in{' '}
            <button onClick={this.logout}>logout</button>
          </div>
          {this.state.blogs.map(blog => <Blog key={blog._id} blog={blog} />)}
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

    return <div>{this.state.user === null ? loginForm() : blogs()}</div>;
  }
}

export default App;
