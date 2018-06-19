import React, { Component } from 'react';
import { ResponsiveContainer, BarChart, AreaChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Button } from 'semantic-ui-react';

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
    const rawData = parseHtml(asd);

    const countData = rawData
      .map(exam => ({
        name: exam.course,
        date: exam.date,
        U: exam.grades.U,
        3: exam.grades[3],
        4: exam.grades[4],
        5: exam.grades[5],
      }))
      .sort((a, b) => {
        const dateA = Date.parse(a.date);
        const dateB = Date.parse(b.date);

        if (dateA > dateB) { return 1; }
        if (dateB > dateA) { return -1; }
        return 0;
      });

    const percentageData = rawData.map((exam) => {
      const sum = Object.values(exam.grades).reduce((a, b) => Number.parseInt(a, 10) + Number.parseInt(b, 10), 0) / 100;
      // console.log('sum', sum);
      // const sum = _.sum(_.values(exam.grades));

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

    console.log(percentageData);

    this.setState({
      countData,
      percentageData,
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

  renderAreaChart = data => (
    <ResponsiveContainer height={350} width="100%">
      <AreaChart
        width={1000}
        data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
          }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area dataKey="U" stackId="a" stroke="#0088FE" fill="#0088FE" />
        <Area dataKey="3" stackId="a" stroke="#00C49F" fill="#00C49F" />
        <Area dataKey="4" stackId="a" stroke="#FFBB28" fill="#FFBB28" />
        <Area dataKey="5" stackId="a" stroke="#FF8042" fill="#FF8042" />
      </AreaChart>
    </ResponsiveContainer>
  )

  renderBarChart = data => (
    <ResponsiveContainer height={350} width="100%">
      <BarChart
        width={1000}
        data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
          }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="U" stackId="a" stroke="#0088FE" fill="#0088FE" />
        <Bar dataKey="3" stackId="a" stroke="#00C49F" fill="#00C49F" />
        <Bar dataKey="4" stackId="a" stroke="#FFBB28" fill="#FFBB28" />
        <Bar dataKey="5" stackId="a" stroke="#FF8042" fill="#FF8042" />
      </BarChart>
    </ResponsiveContainer>
  )

  render() {
    console.log(this.state.showCount);
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
        { this.state.showBarChart && this.renderBarChart(data) }
        { this.state.showAreaChart && this.renderAreaChart(data) }
      </div>
    );
  }
}
