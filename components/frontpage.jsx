import React, { Component } from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */
export default class Frontpage extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
  }
  render() {
    return (
      <Segment style={{ width: '100%', textAlign: 'left', fontSize: '1.2em' }} loading={this.props.loading}>
        <Header as="h2"><Icon name="hand spock" />Kul att du hittat hit!</Header>
        <p>Här kan du hitta visualisering av kursstatistik från Linköpings Universitet. För att komma igång; skriv in en kurskod i sökfältet och.. äh, du förstår nog hur man ska göra, det är inte jättesvårt. Kör bara kör!</p>
        <p>Sidans funktionalitet är kanske något begränsad, fler features kommer när det tid, ork och motivation finnes. För önskemål, skicka mail!</p>
        <p>All inspiration för sidan kommer från <em>betygen.se</em>. RIP.</p>
        <Header as="h2"><Icon name="mail" />Kontakt</Header>
        <p>Hittat en bug? Vill du diskutera betygsfördelningen på flervariabeln över en kaffe?</p>
        <p>Släng iväg ett mail till <a href="mailto:hej@liubetyg.se">hej@liubetyg.se</a></p>
      </Segment>
    );
  }
}
