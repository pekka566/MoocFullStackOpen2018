import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {};
}

class Test extends Component {
  render() {
    return <div />;
  }
}

export default connect(mapStateToProps)(Test);
