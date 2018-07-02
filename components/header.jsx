import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import Search from './search';

/* eslint-disable react/prefer-stateless-function */
export default class AppHeader extends Component {
  static propTypes = {
    search: PropTypes.func.isRequired,
    goHome: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Segment inverted vertical textAlign="center" style={{ padding: '1em' }}>
        <Header as="h1" style={{ fontSize: '4.5em', marginTop: 20, cursor: 'pointer' }} onClick={this.props.goHome}>betyg2</Header>
        <Header as="h3">enkel betygstatistik</Header>
        <Search search={this.props.search} />
      </Segment>
    );
  }
}
