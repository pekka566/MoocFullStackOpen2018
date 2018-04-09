import React, { Component } from 'react';

class Person extends Component {
  render() {
    const { name, number } = this.props;
    return (
      <tr key={name}>
        <td>{name}</td>
        <td>{number}</td>
      </tr>
    );
  }
}
export default Person;
