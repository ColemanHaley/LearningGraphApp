import React, { PureComponent } from "react";
import { useState, useEffect } from "react";
import api from "api.js";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data01 = [
  { name: "assignment_1.1", Average_score: 9 },
  { name: "assignment_2.4", Average_score: 9 },
  { name: "assignment_3.1", Average_score: 6 },
  { name: "assignment_4.2", Average_score: 7 },
  { name: "assignment_5.4", Average_score: 5 }
];

// const [assignments, setAssignments] = useState([]);
// const [isLoadingA, setIsLoadingA] = useState(true);
// useEffect(() => api('/assignment/', setAssignments, setIsLoadingA), []);

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
      <div style={{ width: "75%", height: 300, margin: "auto" }}>
        <ResponsiveContainer>
          <BarChart
            data={data01}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="Average_score"
              stackId="a"
              fill="#1890ff"
              onClick={() => {
                window.open("/student_answers/");
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
