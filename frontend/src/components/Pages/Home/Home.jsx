import React, { useState, useEffect } from "react";
import { Layout, Button, List, Card } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import api from "api.js";
import "./Home.scss";

const { Header, Content, Footer } = Layout;

const Home = () => {
  const [resources, setResources] = useState([]);
  const [isLoadingR, setIsLoadingR] = useState(true);
  const [assignments, setAssignments] = useState([]);
  const [isLoadingA, setIsLoadingA] = useState(true);

  useEffect(() => api(`/`, setResources, setIsLoadingR), []);
  useEffect(() => api("/assignment/", setAssignments, setIsLoadingA), []);
  return (
    <div class="home">
      <Card title="Resources" style={{ width: "30rem", margin: "3rem auto" }}>
        <List
          dataSource={resources}
          loading={isLoadingR}
          renderItem={item => (
            <List.Item>
              <Link to={"/resource/" + item}>
                {item.substring(0, item.length - 4)}
              </Link>
            </List.Item>
          )}
          footer={<Button icon={<PlusOutlined />}>Add resource</Button>}
        />
      </Card>
      <Card title="Assignments" style={{ width: "30rem", margin: "3rem auto" }}>
        <List
          dataSource={assignments}
          loading={isLoadingA}
          renderItem={item => (
            <List.Item>
              <Link to={"/assignment/" + item}>
                {item.substring(0, item.length - 4)}
              </Link>
            </List.Item>
          )}
          footer={
            <Link to="/assignment/edit">
              <Button icon={<PlusOutlined />}>Create assignment</Button>
            </Link>
          }
        />
      </Card>
    </div>
  );
};

export default Home;
