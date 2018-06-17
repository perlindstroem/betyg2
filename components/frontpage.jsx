import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import Course from './course';

/* eslint-disable react/prefer-stateless-function */
export default class Frontpage extends Component {
  render() {
    return (
      <Segment vertical style={{ width: '100%' }}>
        <Course />
      </Segment>
    );
  }
}
