import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import PropTypes from 'prop-types';

const CourseBarChart = ({ data }) => (
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
);

CourseBarChart.propTypes = {
  data: PropTypes.any.isRequired,
};

export default CourseBarChart;
