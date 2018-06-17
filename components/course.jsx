import React, { Component } from 'react';
import { ResponsiveContainer, BarChart, AreaChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { parseHtml } from '../services';
import asd from '../services/TATA41.html';

export default class Course extends Component {
    state = {
      data: [],
    }
    componentDidMount() {
      const data = parseHtml(asd)
        .map(exam => ({
          name: exam.course,
          date: exam.date,
          U: exam.grades.U,
          3: exam.grades[3],
          4: exam.grades[4],
          5: exam.grades[5],
        }));

      console.log(data);

      this.setState({
        data,
      });
    }

    render() {
      return (
        <div>
          <ResponsiveContainer height={350} width="100%">
            <AreaChart
              width={1000}
              data={this.state.data}
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
          <ResponsiveContainer height={350} width="100%">
            <BarChart
              width={1000}
              data={this.state.data}
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
        </div>
      );
    }
}
