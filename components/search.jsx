import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class Search extends Component {
  static propTypes = {
    search: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.updateValue = this.updateValue.bind(this);
    this.submit = this.submit.bind(this);
  }

  state = {
    value: '',
  }

  updateValue(e, { value }) {
    this.setState({
      value,
    });
  }

  submit(e) {
    e.preventDefault();

    if (this.state.value !== '') {
      this.props.search(this.state.value);
      this.setState({
        value: '',
      });
    }
  }

  render() {
    return (
      <Form inverted className="grid centered" style={{ marginBottom: 20, marginTop: 20 }}>
        <Form.Input
          autofocus
          width="6"
          action={<Button content="Sök" type="submit" onClick={this.submit} />}
          value={this.state.value}
          onChange={this.updateValue}
        />
      </Form>
    );
  }
}
