import React from 'react';
import Filter from './components/Filter';
import Person from './components/Person';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    };
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
    if (
      names
        .map(person => {
          return person.name.toLowerCase();
        })
        .indexOf(this.state.newName.toLowerCase()) === -1
    ) {
      names.push({ name: this.state.newName, number: this.state.newNumber });
      this.setState({ persons: names });
    }
  };

  render() {
    const persons = this.filteredNames();
    const personList = persons.map(person => (
      <Person key={person.name} name={person.name} number={person.number} />
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
