import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { Radio, Form, Card } from "antd";
import { Redirect } from "react-router-dom";
import "./SignUp.scss";

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
      className="signup-form"
      style={{ maxWidth: "500px" }}
    >
      <Form.Item
        name="professor"
        rules={[{ required: true, message: "Must choose one!" }]}
      >
        <Radio.Group defaultValue={null} size="large">
          <Radio.Button value={true}>Professor</Radio.Button>
          <Radio.Button value={false}>Student</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};

//const f = Form.create({ name: "profstudent" })(ProfStudentForm);

const SignUp = props => {
  console.log(props.prof);
  if (props.prof != null && props.prof == false) {
    return <Redirect to="/" />;
  } else if (props.prof == true) {
    return <Redirect to="/course-setup/" />;
  }
  const handleSubmit = prof => {
    props.setProfessor(prof);
    props.setLoggedIn(true);
  };
  return (
    <>
      <div class="signup-hero">
        <div class="hero-content">
          <p>
            <span class="tagline">
              First things first. Are you a professor or a student?
            </span>
          </p>
        </div>
        <Card
          style={{
            width: "300px",
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
