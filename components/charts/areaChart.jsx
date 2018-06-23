import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import PropTypes from 'prop-types';

/* eslint-disable react/forbid-prop-types, no-param-reassign */
const CourseAreaChart = ({ data, colors, labels }) => (
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
      {
        (labels || []).map((label, index) => <Area key={label} dataKey={label} stackId="a" stroke={colors[index]} fill={colors[index]} />)
      }
    </AreaChart>
  </ResponsiveContainer>
);

CourseAreaChart.propTypes = {
  data: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
};

export default CourseAreaChart;
