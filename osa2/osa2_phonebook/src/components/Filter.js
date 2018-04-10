import React, { Component } from 'react';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: ''
    };
  }

  handleFilter = event => {
    const filter = event.target.value;
    this.setState({ filter });
    this.props.handleFilter(filter);
  };

  render() {
    const { filter } = this.state;
    return (
        <div>
          rajaa näytettäviä{' '}
          <input value={filter} onChange={this.handleFilter} />
        </div>
    );
  }
}

export default Filter;
