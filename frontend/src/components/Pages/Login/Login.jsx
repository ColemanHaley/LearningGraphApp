import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { Input, Form, Card, Checkbox, Alert } from "antd";
import { Redirect } from "react-router-dom";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import "./SignUp.scss";
import { api_json } from "api.js";

const { TextArea } = Input;

const storeauth = tokens => {
  sessionStorage.setItem("terrazzo_access", tokens.access_token);
  sessionStorage.setItem("terrazzo_refresh", tokens.refresh_token);
};

const LoginForm = props => {
  const [values, setValues] = React.useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState([]);

  const onFinish = vals => {
    setError([]);
    api_json(
      `/users/login/`,
      tokens => storeauth(tokens),
      setLoading,
      setError,
      "POST",
      JSON.stringify({ email: vals.email, password: vals.password })
    );
  };
  const alerts = error.map((e, i) => (
    <>
      <Alert message={e} type="error" showIcon key={i} />
      <br />
    </>
  ));
  return (
    <>
      {alerts}
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ maxWidth: "500px" }}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </>
  );
};

const Login = props => {
  return (
    <>
      <div class="login-hero">
        <Card
          title="Login"
          style={{
            width: "500px",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "3vh"
          }}
        >
          <LoginForm />
        </Card>
      </div>
      <div class="app-desc">.</div>
    </>
  );
};

export default Login;
