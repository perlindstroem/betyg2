import React, { Component } from 'react';
import { Button, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import BarChart from './charts/barChart';
import AreaChart from './charts/areaChart';
import PieChart from './charts/pieChart';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default class Course extends Component {
  static propTypes = {
    data: PropTypes.array,
    labels: PropTypes.array,
    courseCode: PropTypes.string.isRequired,
  }

  static defaultProps = {
    data: [],
    labels: [],
  }

  constructor(props) {
    super(props);

    this.toggleAreaChart = this.toggleAreaChart.bind(this);
    this.toggleBarChart = this.toggleBarChart.bind(this);
    this.toggleCountOrPercentage = this.toggleCount.bind(this);
  }

  state = {
    showBarChart: true,
    showAreaChart: false,
    showCount: true,
  }

  toggleAreaChart() {
    this.setState({
      showBarChart: false,
      showAreaChart: true,
    });
  }

  toggleBarChart() {
    this.setState({
      showBarChart: true,
      showAreaChart: false,
    });
  }

  toggleCount(count) {
    this.setState({
      showCount: count,
    });
  }

  render() {
    const data = this.props.data.map((entry) => {
      const grades = entry.grades.reduce((map, grade) => {
        map[grade.grade] = this.state.showCount ? grade.count : grade.percentage;
        return map;
      }, {});

      const { date, name } = entry;

      return Object.assign({
        date, name,
      }, grades);
    });

    const summed = this.props.data.reduce((list, entry) => {
      entry.grades.forEach((grade) => {
        (list.find(elem => elem.grade === grade.grade)).count += grade.count;
      });
      return list;
    }, this.props.labels.map(label => ({ grade: label, count: 0 })));

    return (
      <div style={{ width: '100%' }}>
        <Header as="h2">
          { (this.props.courseCode).toUpperCase() }
        </Header>
        <div>
          <Button
            attached="left"
            onClick={this.toggleBarChart}
            active={this.state.showBarChart}
          >
            Bar
          </Button>
          <Button
            attached="right"
            onClick={this.toggleAreaChart}
            active={this.state.showAreaChart}
          >
            Area
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            attached="left"
            onClick={() => { this.toggleCount(true); }}
            active={this.state.showCount}
          >
            Antal
          </Button>
          <Button
            attached="right"
            onClick={() => { this.toggleCount(false); }}
            active={!this.state.showCount}
          >
          Procent
          </Button>
        </div>
        { this.state.showBarChart && <BarChart data={data} colors={COLORS} labels={this.props.labels} /> }
        { this.state.showAreaChart && <AreaChart data={data} colors={COLORS} labels={this.props.labels} />}
        { <PieChart data={summed} colors={COLORS} /> }
      </div>
    );
  }
}
