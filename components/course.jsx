import React, { Component } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { parseHtml } from '../services';
import asd from '../services/TATA41.html';

const data2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

/* eslint-disable react/prefer-stateless-function */
export default class Course extends Component {
    state = {
      data: [],
    }
    componentDidMount() {
      const data = parseHtml(asd);
      console.log(data);

      this.setState({
        data,
      });
    }
    render() {
      const graphData1 = this.state.data.map(exam => exam.grades[3] || 0);
      const graphData2 = this.state.data.map(exam => exam.grades[4] || 0);
      const graphData3 = this.state.data.map(exam => exam.grades[5] || 0);
      const labels = this.state.data.map(exam => exam.date);
      const data = {
        labels,
        datasets: [
          {
            label: '3',
            borderColor: 'black',
            // backgroundColor: 'green',
            data: graphData1,
            stack: '1',
            fill: true,
          },
          {
            label: '4',
            borderColor: 'black',
            // backgroundColor: 'blue',
            data: graphData2,
            stack: '1',
            fill: true,
          },
          {
            label: '5',
            borderColor: 'black',
            // backgroundColor: 'orange',
            data: graphData3,
            stack: '1',
            fill: true,
          },
        ],
      };
      const options = {
        scales: {
          /* xAxes: [{
            stacked: true,
          }], */
          yAxes: [{
            stacked: true,
          }],
        },
      };
      return (
        <div>
          <Line style={{ width: '100%' }} data={data} />
          <Line data={data2} options={options} />
        </div>
      );
    }
}
