import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { Input, Form, Card } from "antd";
import { Redirect } from "react-router-dom";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "./SignUp.scss";

const { TextArea } = Input;

const ProfStudentForm = props => {
  const [values, setValues] = React.useState([]);
  const [form] = Form.useForm();

  const handleSubmit = vals => {
    props.onSubmit(vals.professor);
  };
  return (
    <Form
      name="profstudentform"
      onFinish={handleSubmit}
      layout="vertical"
      className="course-form"
      style={{ maxWidth: "500px" }}
    >
      <Form.Item
        name="coursename"
        label="Course Name"
        rules={[{ required: true, message: "Course name required!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Course Topics">
        <p class="exposition">
          Terrazzo works by utilizing descriptions of the course topics you
          provide to determine the relevant course topics for questions. Add
          course topics and descriptions below. We recommend using a relevant
          textbook chapter as the description.
        </p>
      </Form.Item>
      <Form.Item label="Topic 1">
        <Input placeholder="Topic title" />
        <TextArea lines={10} placeholder="Topic Description" />
      </Form.Item>
      <Form.Item label="Topic 2">
        <Input placeholder="Topic title" />
        <TextArea lines={10} placeholder="Topic Description" />
      </Form.Item>
      <Form.Item>
        <Button type="dashed" style={{ width: "60%" }}>
          <PlusOutlined /> Add course topic
        </Button>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Create Course
        </Button>
      </Form.Item>
    </Form>
  );
};

//const f = Form.create({ name: "profstudent" })(ProfStudentForm);

const SignUp = props => {
  const [s, setS] = useState(false);
  if (s) {
    return <Redirect to="/" />;
  }
  console.log(props.prof);
  if (props.prof == false) {
    return <Redirect to="/" />;
  }
  const handleSubmit = prof => {
    setS(true);
  };
  return (
    <>
      <div class="signup-hero">
        <div class="hero-content">
          <p>
            <span class="tagline">
              Excellent. Let's get started by creating your first course.
            </span>
          </p>
        </div>
        <Card
          style={{
            width: "500px",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "3vh"
          }}
        >
          <ProfStudentForm onSubmit={handleSubmit} />
        </Card>
      </div>
      <div class="app-desc">.</div>
    </>
  );
};

export default SignUp;
