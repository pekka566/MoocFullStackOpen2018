import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import App from './App';
import Users from './components/Users';
import Blog from './components/Blog';

const blogById = id => this.state.notes.find(note => note.id === Number(id));

const routes = (
  <div>
    <Router>
      <div>
        <div>
          <Link to="/">home</Link> &nbsp;
          <Link to="/users">users</Link> &nbsp;
          <Link to="/users">users</Link> &nbsp;
        </div>

        <Route exact path="/" render={() => <App />} />
        <Route exact path="/users" render={() => <Users />} />
        <Route
          exact
          path="/notes/:id"
          render={({ match }) => <Blog note={blogById(match.params.id)} />}
        />
      </div>
    </Router>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
