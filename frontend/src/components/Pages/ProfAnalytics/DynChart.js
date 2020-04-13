import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data01 = [
  { name: 'Assignment1.1', score: 9 }, { name: 'Assignment2.4', score: 9 },
  { name: 'Assignment3.1', score: 6 }, { name: 'Assignment4.2', score: 7},
  { name: 'Assignment5.4', score: 5 }
];

function CustomTooltip({ payload, label, active }) {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="desc">Format: Assignment #.Question #</p>
      </div>
    );
  }
  return null;
}

export default class DynChart extends PureComponent {

  render() {
    return (
      <div style={{ width: '75%', height: 300 }}>
      <ResponsiveContainer >
      <BarChart
        data={data01}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="score" stackId="a" fill="#1890ff" />
      </BarChart>
      </ResponsiveContainer>
      </div>
    );
  }
}