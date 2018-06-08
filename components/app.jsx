import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Grid } from 'semantic-ui-react';

import Frontpage from './frontpage';
import AppHeader from './header';

/* eslint-disable react/prefer-stateless-function */
class App extends Component {
  render() {
    return (
      <div>
        <AppHeader />
        <Grid container centered>
          <Frontpage />
        </Grid>
      </div>
    );
  }
}

export default hot(module)(App);
