import React from 'react';
import { Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import PropTypes from 'prop-types';

/* eslint-disable react/forbid-prop-types */
const CourseBarChart = ({ data, colors }) => (
  <PieChart width={300} height={300}>
    <Tooltip />
    <Legend />
    <Pie data={data} nameKey="grade" dataKey="count" innerRadius={60} outerRadius={110} fill="#82ca9d">
      {
        (data || []).map((entry, index) => <Cell key={entry.grade} fill={colors[index]} />)
      }
    </Pie>
  </PieChart>
);

CourseBarChart.propTypes = {
  data: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
};

export default CourseBarChart;
