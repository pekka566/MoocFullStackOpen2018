import React, { Component } from 'react';

class Person extends Component {
  render() {
    const { name, number, deleteHandler, id } = this.props;
    return (
      <tr key={name}>
        <td>{name}</td>
        <td>{number}</td>
        <td><button onClick={(e)=>deleteHandler(id, e)}>poista</button></td>
      </tr>
    );
  }
}
export default Person;
