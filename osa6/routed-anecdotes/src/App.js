import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CreateNew from './CreateNew';

const Menu = () => (
  <div>
    <Link to="/">anecdotes</Link> &nbsp;
    <Link to="/create">create new</Link> &nbsp;
    <Link to="/about">about</Link>
  </div>
);

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h1>
        {anecdote.content} by {anecdote.author}
      </h1>
      <div>
        <p>has {anecdote.votes} votes</p>
        <p>for more info see {anecdote.info}</p>
      </div>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <Paper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <h2>Anecdotes</h2>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {anecdotes.map(anecdote => (
          <TableRow key={anecdote.id}>
            <TableCell>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

const About = () => (
  <div>
    <div>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Grid container>
            <Typography variant="headline" component="h2">
              About anecdote app
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={12}>
            <Typography component="p">According to Wikipedia:</Typography>
            <Typography component="em">
              <br />
              An anecdote is a brief, revealing account of an individual person
              or an incident. Occasionally humorous, anecdotes differ from jokes
              because their primary purpose is not simply to provoke laughter
              but to reveal a truth more general than the brief tale itself,
              such as to characterize a person by delineating a specific quirk
              or trait, to communicate an abstract idea about a person, place,
              or thing through the concrete details of a short narrative. An
              anecdote is "a story with a point."
            </Typography>
            <Typography component="p">
              <br />
              Software engineering is full of excellent anecdotes, at this app
              you can find the best and add more.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <img src="data:image/jpeg;base64,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" />
        </Grid>
      </Grid>
    </div>
  </div>
);

const notificationStyle = {
  color: 'green',
  fontStyle: 'italic',
  fontSize: 16,
  borderStyle: 'solid',
  borderWidth: '2px',
  borderRadius: '5px',
  padding: '5px',
  margin: '5px',
  borderColor: 'green'
};

const Notification = ({ message }) => (
  <div style={notificationStyle}>{message}</div>
);

const Footer = () => (
  <div>
    Anecdote app for{' '}
    <a href="https://courses.helsinki.fi/fi/TKT21009/121540749">
      Full Stack -sovelluskehitys
    </a>. See{' '}
    <a href="https://github.com/mluukkai/routed-anecdotes">
      https://github.com/mluukkai/routed-anecdotes
    </a>{' '}
    for the source code.
  </div>
);

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info:
            'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    };
  }

  addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `a new anecdote ${anecdote.content} created!`
    });
    setTimeout(() => {
      this.setState({ notification: null });
    }, 10000);
  };

  anecdoteById = id => this.state.anecdotes.find(a => a.id === id);

  vote = id => {
    const anecdote = this.anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    };

    const anecdotes = this.state.anecdotes.map(a => (a.id === id ? voted : a));

    this.setState({ anecdotes });
  };

  render() {
    const anecdoteById = id => {
      return this.state.anecdotes.find(anecdote => anecdote.id == id);
    };

    return (
      <div>
        <Router>
          <div>
            <AppBar position="static" color="default">
              <Toolbar>
                <Typography variant="title" color="inherit">
                  Software anecdotes <Menu />
                </Typography>
              </Toolbar>
            </AppBar>

            {this.state.notification && (
              <Notification message={this.state.notification} />
            )}
            <Route
              exact
              path="/"
              render={() => <AnecdoteList anecdotes={this.state.anecdotes} />}
            />
            <Route
              exact
              path="/anecdotes/:id"
              render={({ match }) => (
                <Anecdote anecdote={anecdoteById(match.params.id)} />
              )}
            />
            <Route path="/about" render={() => <About />} />
            <Route
              path="/create"
              render={({ history }) => (
                <CreateNew addNew={this.addNew} history={history} />
              )}
            />
          </div>
        </Router>

        <Footer />
      </div>
    );
  }
}

export default App;
