import React, { Component } from 'react';
import { Segment, Header, Search } from 'semantic-ui-react';
import faker from 'faker';

const source = [{
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, '$'),
}, {
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, '$'),
}, {
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, '$'),
}, {
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, '$'),
}, {
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, '$'),
}];

/* eslint-disable react/prefer-stateless-function */
export default class AppHeader extends Component {
  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      this.setState({
        isLoading: false,
        results: source.filter(entry => entry.title.includes(this.state.value)),
      });
    }, 300);
  }

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Segment inverted vertical textAlign="center" style={{ padding: '1em' }}>
        <Header as="h1" style={{ fontSize: '4.5em', marginTop: 20 }}>betyg2</Header>
        <Header as="h3">enkel betygstatistik</Header>
        <Search
          size="big"
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={this.handleSearchChange}
          results={results}
          value={value}
          {...this.props}
        />
      </Segment>
    );
  }
}
