import React, { Component } from 'react';
import { ResponsiveContainer, BarChart, AreaChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
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
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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

        <PieChart width={300} height={300}>
          <Tooltip />
          <Legend />
          <Pie data={this.state.totalData} nameKey="name" dataKey="value" innerRadius={60} outerRadius={110} fill="#82ca9d">
            {
              (this.state.totalData || []).map((entry, index) => <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
        </PieChart>
      </div>
    );
  }
}
