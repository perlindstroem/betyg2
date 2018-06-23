import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import PropTypes from 'prop-types';

const CourseAreaChart = ({ data }) => (
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
);

CourseAreaChart.propTypes = {
  data: PropTypes.any.isRequired,
};

export default CourseAreaChart;
