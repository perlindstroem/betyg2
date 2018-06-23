import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import PropTypes from 'prop-types';

/* eslint-disable react/forbid-prop-types */
const CourseBarChart = ({ data, labels, colors }) => (
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
      {
          (labels || []).map((label, index) => <Bar key={label} dataKey={label} stackId="a" stroke={colors[index]} fill={colors[index]} />)
        }
    </BarChart>
  </ResponsiveContainer>
);

CourseBarChart.propTypes = {
  data: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
};

export default CourseBarChart;
