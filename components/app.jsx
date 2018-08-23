import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Grid } from 'semantic-ui-react';
import rp from 'request-promise';

import Frontpage from './frontpage';
import Header from './header';
import Course from './course';

/* eslint-disable react/prefer-stateless-function */
class App extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.showFrontpage = this.showFrontpage.bind(this);
  }

  state = {
    loading: false,
    displayCourse: false,
    data: [],
    labels: [],
    courseCode: '',
  }

  async search(courseCode) {
    this.setState({
      loading: true,
      displayCourse: false,
    });

    const courseData = await rp(`${window.location.href}api/course/${courseCode}`);

    const sortedData = JSON.parse(courseData)
      .sort((a, b) => {
        const dateA = Date.parse(a.date);
        const dateB = Date.parse(b.date);

        if (dateA > dateB) { return 1; }
        if (dateB > dateA) { return -1; }
        return 0;
      })
      .filter(course => course.type === 'TEN1');

    const data = sortedData.map((exam) => {
      const sum = exam.grades.map(grade => grade.count).reduce((a, b) => a + b, 0) / 100;
      const grades = exam.grades.map(grade => ({
        grade: grade.grade,
        count: grade.count,
        percentage: grade.count / sum,
      }));

      return {
        name: exam.course,
        date: exam.date,
        sum,
        grades,
      };
    });

    const labels = Array.from((data || []).reduce((set, entry) => {
      entry.grades.map(grade => grade.grade).forEach((label) => { set.add(label); });
      return set;
    }, new Set()));

    const callback = () => {
      this.setState({
        loading: false,
        displayCourse: true,
        data,
        labels,
        courseCode,
      });
    };

    // up the number for testing purposes
    setTimeout(callback, 0);
  }

  showFrontpage() {
    this.setState({
      displayCourse: false,
      loading: false,
    });
  }

  render() {
    return (
      <div>
        <Header search={this.search} goHome={this.showFrontpage} />
        <Grid container centered style={{ paddingTop: 30 }}>
          {
            this.state.displayCourse &&
            <Course
              data={this.state.data}
              labels={this.state.labels}
              courseCode={this.state.courseCode}
            />
          }
          {
            !this.state.displayCourse &&
            <Frontpage loading={this.state.loading} />
          }
        </Grid>
      </div>
    );
  }
}

export default hot(module)(App);
