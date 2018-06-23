import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

import BarChart from './charts/barChart';
import AreaChart from './charts/areaChart';
import PieChart from './charts/pieChart';

import { parseHtml } from '../services';
import asd from '../services/TATA41.html';

export default class Course extends Component {
  constructor(props) {
    super(props);

    this.toggleAreaChart = this.toggleAreaChart.bind(this);
    this.toggleBarChart = this.toggleBarChart.bind(this);
    this.toggleCountOrPercentage = this.toggleCount.bind(this);
  }

  state = {
    countData: [],
    percentageData: [],
    showBarChart: true,
    showAreaChart: false,
    showCount: true,
  }

  componentDidMount() {
    const rawData = parseHtml(asd).sort((a, b) => {
      const dateA = Date.parse(a.date);
      const dateB = Date.parse(b.date);

      if (dateA > dateB) { return 1; }
      if (dateB > dateA) { return -1; }
      return 0;
    });

    const countData = rawData
      .map(exam => ({
        name: exam.course,
        date: exam.date,
        U: exam.grades.U,
        3: exam.grades[3],
        4: exam.grades[4],
        5: exam.grades[5],
      }));


    const percentageData = rawData.map((exam) => {
      const sum = Object.values(exam.grades).reduce((a, b) => Number.parseInt(a, 10) + Number.parseInt(b, 10), 0) / 100;

      return {
        name: exam.course,
        date: exam.date,
        sum,
        U: (exam.grades.U / sum) || 0,
        3: (exam.grades[3] / sum) || 0,
        4: (exam.grades[4] / sum) || 0,
        5: (exam.grades[5] / sum) || 0,
      };
    });

    const totalGrades = rawData
      .reduce((total, entry) => ({
        U: total.U + (Number.parseInt(entry.grades.U, 10) || 0),
        3: total[3] + (Number.parseInt(entry.grades[3], 10) || 0),
        4: total[4] + (Number.parseInt(entry.grades[4], 10) || 0),
        5: total[5] + (Number.parseInt(entry.grades[5], 10) || 0),
      }), {
        U: 0,
        3: 0,
        4: 0,
        5: 0,
      });

    const totalData = Object.entries(totalGrades)
      .map(([key, value]) => ({
        name: key,
        value,
      }))
      .sort((a, b) => {
        if (a.name === 'U') {
          console.log('a is U');
          return -1;
        }
        if (b.name === 'U') {
          console.log('b is U');
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

    console.log(percentageData);
    console.log(totalData);

    this.setState({
      countData,
      percentageData,
      totalData,
    });
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
    const data = this.state.showCount ? this.state.countData : this.state.percentageData;

    return (
      <div>
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
        { this.state.showBarChart && <BarChart data={data} /> }
        { this.state.showAreaChart && <AreaChart data={data} />}
        <PieChart data={this.state.totalData} />
      </div>
    );
  }
}
