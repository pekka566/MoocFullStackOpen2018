import React from 'react';
import Filter from './components/Filter';
import Person from './components/Person';
import personService from './services/Persons';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    };
  }

  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response })
      })
  }

  handleNewName = event => {
    this.setState({ newName: event.target.value });
  };

  handleNewNumber = event => {
    this.setState({ newNumber: event.target.value });
  };

  handleFilter = filter => {
    this.setState({ filter });
  };

  filteredNames = () => {
    const { persons, filter } = this.state;
    return filter === ''
      ? persons
      : persons.filter(person => {
          return person.name.toLowerCase().includes(filter.toLowerCase());
        });
  };

  addName = event => {
    event.preventDefault();
    const names = this.state.persons.slice(0);
    const {newName, newNumber} = this.state;
    const person = this.findPersonByName(newName);
    const newPerson = { name: newName, number: newNumber };
    if (!person) {
      personService.create(newPerson).
        then(response => {
          names.push(response);
          this.setState({ persons: names });
        })
    } else {
      const result = window.confirm(
        `${person.name} on jo luettelossa, korvataanko vanha numero uudella?`);
      if(result) {
        personService.update(person.id, newPerson).
        then(updatedPerson => {
          const oldPersons = this.state.persons.filter(oldPerson => oldPerson.id !== person.id);
          this.setState({
              persons: oldPersons.concat(updatedPerson)
          });
        })
      }
    }
  };

  deleteHandler = (id, event) => {
    const person = this.findPerson(id);
    const result = window.confirm(`poistetaanko ${person.name}`);
    if(result){
      event.preventDefault();
      personService.remove(id).
        then(this.setState(
          { persons: this.state.persons.filter((person) => person.id !== id) })
        );
    }
  }

  findPersonByName = (name) => {
    return this.state.persons.find(
      person => person.name.toLowerCase() === name.toLowerCase() );
  }

  findPerson = (id) => {
    return this.state.persons.find(person => person.id === id );
  }

  render() {
    const persons = this.filteredNames();
    const personList = persons.map(person => (
      <Person key={person.id} id={person.id} name={person.name}
        number={person.number} deleteHandler={this.deleteHandler} />
    ));
    return (
      <div>
        <Filter handleFilter={this.handleFilter} />
        <h2>Lisää uusi</h2>
        <form onSubmit={this.addName}>
          <div>
            nimi:{' '}
            <input value={this.state.newName} onChange={this.handleNewName} />
          </div>
          <div>
            numero:{' '}
            <input
              value={this.state.newNumber}
              onChange={this.handleNewNumber}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <table>
          <tbody>{personList}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
