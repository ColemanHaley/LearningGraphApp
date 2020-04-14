import React, { useState, useEffect } from "react";
import { Layout, Button, List } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import api from "api.js";

const { Header, Content, Footer } = Layout;

const Home = () => {
  const [resources, setResources] = useState([]);
  const [isLoadingR, setIsLoadingR] = useState(true);
  const [assignments, setAssignments] = useState([]);
  const [isLoadingA, setIsLoadingA] = useState(true);

  useEffect(() => api(`/`, setResources, setIsLoadingR), []);
  useEffect(() => api('/assignment/', setAssignments, setIsLoadingA), []);
  return (
    <>
      <h1>Resources</h1>
      <List
        dataSource={resources}
        loading={isLoadingR}
        renderItem={item => (
          <List.Item>
            <Link to={"/resource/" + item}>{item.substring(0, item.length - 4)}</Link>
          </List.Item>
        )}
        footer={<Button icon={<PlusOutlined />}>Add resource</Button>}
      />
      <h1>Assignments</h1>
      <List
        dataSource={assignments}
        loading={isLoadingA}
        renderItem={item => (
          <List.Item>
            <Link to={"/assignment/" + item}>{item.substring(0, item.length - 4)}</Link>
          </List.Item>
        )}
        footer={
          <Link to="/assignment/edit">
            <Button icon={<PlusOutlined />}>Create assignment</Button>
          </Link>
        }
      />
      <Button type="primary" onClick={() => {
          window.open('/prof_analytics/', '_self');}}>
          Professor Analytics
      </Button>
    </>
  );
};

export default Home;
