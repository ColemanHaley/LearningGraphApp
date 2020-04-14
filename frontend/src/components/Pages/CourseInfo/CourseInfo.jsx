import React, { useState, useEffect } from "react";
import { Layout, Button, List, Card } from "antd";
import { Link } from "react-router-dom";
import { UploadOutlined, EditOutlined } from "@ant-design/icons";
import api from "api.js";

const { Header, Content, Footer } = Layout;
const data = [
  "Word Vectors",
  "Neural Networks",
  "Matrix Calculus & Backpropagation",
  "Dependency Parsing",
  "Recurrent Neural Networks and Language Models"
];
const CourseInfo = props => {
  return (
    <>
      <h1> Course Syllabus </h1>
      {props.prof ? (
        <Button
          type="primary"
          icon={<UploadOutlined />}
          onClick={() => {
            alert("Coming soon!");
          }}
        >
          Upload Syllabus
        </Button>
      ) : null}
      <h1>Course Topics</h1>
      <List
        dataSource={data}
        renderItem={item => <List.Item> {item} </List.Item>}
      />
      {props.prof ? (
        <Button type="primary" icon={<EditOutlined />}>
          {" "}
          Edit Course Topics{" "}
        </Button>
      ) : null}
      <h1>Learning Goals</h1>
      <p>
        {" "}
        In this course, students will gain a thorough introduction to
        cutting-edge research in Deep Learning for NLP. Through lectures,
        assignments and a final project, students will learn the necessary
        skills to design, implement, and understand their own neural network
        models.
      </p>
      {props.prof ? (
        <Button type="primary" icon={<EditOutlined />}>
          {" "}
          Edit Course Topics{" "}
        </Button>
      ) : null}
    </>
  );
};

export default CourseInfo;
