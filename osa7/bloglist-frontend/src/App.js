import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import BlogsContainer from './components/BlogsContainer';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import loginService from './services/login';

import SimpleBlog from './components/SimpleBlog';
import Users from './components/Users';
import User from './components/User';
import UserInfo from './components/UserInfo';
import blogService from './services/blogs';
import userService from './services/users';

import { getBlogs } from './reducers/blogs';
import { getUsers } from './reducers/users';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      username: '',
      password: '',
      visible: false
    };
  }

  componentDidMount() {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      this.setState({ user });
      blogService.setToken(user.token);
    }
    this.props.getUsers();
    this.props.getBlogs();
  }

  handleInputFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
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

  render() {
    const loginForm = () => {
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

    const username = this.state.user ? this.state.user.username : '';
    const userById = id => this.props.users.find(user => user.id == id);
    const blogById = id => this.props.blogs.blogs.find(blog => blog.id == id);

    const routes = (
      <div>
        <Router>
          <div>
            <div>
              <Link to="/">home</Link> &nbsp;
              <Link to="/blogs">blogs</Link> &nbsp;
              <Link to="/users">users</Link> &nbsp;
            </div>
            <div>
              <h1>blog app</h1>
              {this.state.user ? (
                <UserInfo username={username} logout={this.logout} />
              ) : (
                loginForm()
              )}
            </div>

            <Route
              exact
              path="/"
              render={() => <BlogsContainer user={this.state.user} />}
            />
            <Route
              exact
              path="/blogs"
              render={() => <BlogsContainer user={this.state.user} />}
            />
            <Route
              exact
              path="/blogs/:id"
              render={({ match }) => (
                <SimpleBlog blog={blogById(match.params.id)} />
              )}
            />
            <Route
              exact
              path="/users"
              render={() => (
                <Users user={this.state.user} users={this.props.users} />
              )}
            />
            <Route
              exact
              path="/users/:id"
              render={({ match }) => <User user={userById(match.params.id)} />}
            />
          </div>
        </Router>
      </div>
    );

    return routes;
  }
}

function mapStateToProps(state) {
  return { blogs: state.blogs, users: state.users };
}

const mapDispatchToProps = dispatch => {
  return {
    getBlogs: () => {
      dispatch(getBlogs());
    },
    getUsers: () => {
      dispatch(getUsers());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
