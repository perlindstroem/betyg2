import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import rp from 'request-promise';

import BarChart from './charts/barChart';
import AreaChart from './charts/areaChart';
import PieChart from './charts/pieChart';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default class Course extends Component {
  constructor(props) {
    super(props);

    this.toggleAreaChart = this.toggleAreaChart.bind(this);
    this.toggleBarChart = this.toggleBarChart.bind(this);
    this.toggleCountOrPercentage = this.toggleCount.bind(this);
  }

  state = {
    data: [],
    labels: [],
    showBarChart: true,
    showAreaChart: false,
    showCount: true,
  }

  async componentDidMount() {
    const courseData = await rp(`${window.location.href}api/course/TATA42`);
    const sortedData = JSON.parse(courseData)
      .sort((a, b) => {
        const dateA = Date.parse(a.date);
        const dateB = Date.parse(b.date);

        if (dateA > dateB) { return 1; }
        if (dateB > dateA) { return -1; }
        return 0;
      });

    const data = sortedData.map((exam) => {
      const sum = exam.grades.map(grade => grade.count).reduce((a, b) => a + b, 0) / 100;
      const grades = exam.grades.map(grade => ({
        grade: grade.grade,
        count: grade.count,
        percentage: grade.count / sum,
      }));

      return {
        name: exam.course,
        date: exam.date,
        sum,
        grades,
      };
    });

    const labels = Array.from((data || []).reduce((set, entry) => {
      entry.grades.map(grade => grade.grade).forEach((label) => { set.add(label); });
      return set;
    }, new Set()));

    this.setState({
      data,
      labels,
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
    const data = this.state.data.map((entry) => {
      const grades = entry.grades.reduce((map, grade) => {
        map[grade.grade] = this.state.showCount ? grade.count : grade.percentage;
        return map;
      }, {});

      const { date, name } = entry;

      return Object.assign({
        date, name,
      }, grades);
    });

    const summed = this.state.data.reduce((list, entry) => {
      entry.grades.forEach((grade) => {
        (list.find(elem => elem.grade === grade.grade)).count += grade.count;
      });
      return list;
    }, this.state.labels.map(label => ({ grade: label, count: 0 })));

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
        { this.state.showBarChart && <BarChart data={data} colors={COLORS} labels={this.state.labels} /> }
        { this.state.showAreaChart && <AreaChart data={data} colors={COLORS} labels={this.state.labels} />}
        { <PieChart data={summed} colors={COLORS} /> }
      </div>
    );
  }
}
