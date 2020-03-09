import React, { useState, useEffect } from "react";
import { Layout, Button, List } from "antd";
import { Link, Redirect } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import api from "api.js";

const { Header, Content, Footer } = Layout;

const Home = () => {
  const [resources, setResources] = useState([]);
  const [isLoadingR, setIsLoadingR] = useState(true);
  const [assignments, setAssignments] = useState([]);
  const [isLoadingA, setIsLoadingA] = useState(true);

  useEffect(() => api(`/`, setResources, setIsLoadingR), []);

  return (
    <>
      <h1>Resources</h1>
      <List
        dataSource={resources}
        loading={isLoadingR}
        renderItem={item => (
          <List.Item>
            <Link to={"/resource/" + item}>{item}</Link>
          </List.Item>
        )}
        footer={<Button icon={<PlusOutlined />}>Add resource</Button>}
      />
      <h1>Assignments</h1>
      <List
        footer={
          <Link to="/assignment/edit">
            <Button icon={<PlusOutlined />}>Create assignment</Button>
          </Link>
        }
      />
    </>
  );
};

export default Home;
