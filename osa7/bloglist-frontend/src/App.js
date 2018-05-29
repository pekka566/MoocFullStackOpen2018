import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import BlogsContainer from './components/BlogsContainer';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import loginService from './services/login';

import Users from './components/Users';
import UserInfo from './components/UserInfo';
import blogService from './services/blogs';
import userService from './services/users';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      username: '',
      password: '',
      users: [],
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
    this.getUsers();
  }

  getUsers = async () => {
    const users = await userService.getAll();
    this.setState({ users });
  };

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
              path="/users"
              render={() => (
                <Users user={this.state.user} users={this.state.users} />
              )}
            />
          </div>
        </Router>
      </div>
    );

    return routes;
  }
}

export default App;
