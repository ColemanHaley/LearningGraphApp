import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import api from "api.js";
import { Statistic, Row, Col, Card } from "antd";
import { Layout, Button, List } from "antd";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import DynChart from "./DynChart.js";
import "./Analytics.scss";

const { Header, Content, Footer } = Layout;

const data = [
  { name: "Assignment 1", uv: 85, pv: 2400, amt: 2400 },
  { name: "Assignment 2", uv: 75, pv: 2400, amt: 2400 },
  { name: "Assignment 3", uv: 78, pv: 2400, amt: 2400 },
  { name: "Assignment 4", uv: 71, pv: 2400, amt: 2400 },
  { name: "Assignment 5", uv: 90, pv: 2400, amt: 2400 }
];

const topics = [
  "Word Vectors",
  "Neural Networks",
  "Matrix Calculus & Backpropagation",
  "Dependency Parsing",
  "Language Modeling"
];

function CustomTooltip({ payload, label, active }) {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
}

const renderLineChart = props => {
  if (props.prof == false) {
    return <Redirect to="/" />;
  }
  return (
    <div class="home prof-analytics" style={{ width: "100%", height: 300 }}>
      <Card
        title="Assignment Averages"
        style={{ width: "80%", margin: "3rem auto" }}
      >
        <div class="chart-holder">
          <ResponsiveContainer style={{ height: 300 }}>
            <LineChart
              data={data}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <Line type="monotone" dataKey="uv" stroke="#001529" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis domain={[50, 100]} />
              <Tooltip content={<CustomTooltip />} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <h1>Course Topic Breakdowns</h1>
      <List
        dataSource={topics}
        renderItem={item => (
          <List.Item>
            <Card title={item} style={{ width: "45%", margin: "3rem auto" }}>
              <h4>Average Scores Per Assignment</h4>
              <div class="chart-holder">
                <DynChart />
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default renderLineChart;
