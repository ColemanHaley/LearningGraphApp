import React, { useState, useEffect } from "react";
import { Layout, Button, List, Card } from "antd";
import { Link } from "react-router-dom";
import { UploadOutlined, EditOutlined } from "@ant-design/icons";
import api from "api.js";
import "./CourseInfo.scss";

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
    <div class="page-container">
      <div
        class="page-content info"
        style={{ textAlign: "left", maxWidth: "500px", minWidth: "300px" }}
      >
        <Card title="Course Syllabus">
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
          ) : (
            "The professor hasn't made a syllabus available!"
          )}
        </Card>
        <Card title="Course Topics">
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
        </Card>

        <Card title="Learning Goals">
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
        </Card>
      </div>
    </div>
  );
};

export default CourseInfo;
