import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "api.js"
import { Statistic, Row, Col, Card } from 'antd';
import { Layout, Button, List } from "antd";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const { Header, Content, Footer } = Layout;

const data = [{name: 'Assignment 1', uv: 500, pv: 2400, amt: 2400}, {name: 'Assignment 2', uv: 300, pv: 2400, amt: 2400}, 
				{name: 'Assignment 3', uv: 350, pv: 2400, amt: 2400}, {name: 'Assignment 4', uv: 200, pv: 2400, amt: 2400},
				{name: 'Assignment 5', uv: 450, pv: 2400, amt: 2400}, {name: 'Assignment 6', uv: 400, pv: 2400, amt: 2400}];

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

const renderLineChart = () => {
	return(
		<div style={{ width: '100%', height: 300 }}>
		  <h1>Assignment Averages</h1>
		  <ResponsiveContainer>
			  <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
			    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
			    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
			    <XAxis dataKey="name" />
			    <YAxis />
	    		<Tooltip content={<CustomTooltip />}/>
			  </LineChart>
		  </ResponsiveContainer>
		  <h1>Course Topic Breakdowns</h1>
  		</div>
  	);
};

export default renderLineChart;