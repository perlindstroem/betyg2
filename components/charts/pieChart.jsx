import React from 'react';
import { Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import PropTypes from 'prop-types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CourseBarChart = ({ data }) => (
  <PieChart width={300} height={300}>
    <Tooltip />
    <Legend />
    <Pie data={data} nameKey="name" dataKey="value" innerRadius={60} outerRadius={110} fill="#82ca9d">
      {
        (data || []).map((entry, index) => <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />)
      }
    </Pie>
  </PieChart>
);

CourseBarChart.propTypes = {
  data: PropTypes.any.isRequired,
};

export default CourseBarChart;
