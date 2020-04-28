import React, { useState, useEffect } from "react";
import { Layout, Button, List, Card } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import api from "api.js";
import "./Home.scss";

const { Header, Content, Footer } = Layout;

const prettify = str => {
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str.split("_").join(" ");
};

const Home = props => {
  const [resources, setResources] = useState([]);
  const [isLoadingR, setIsLoadingR] = useState(true);
  const [assignments, setAssignments] = useState([]);
  const [isLoadingA, setIsLoadingA] = useState(true);

  useEffect(() => api(`/`, setResources, setIsLoadingR), []);
  useEffect(() => api("/assignment/", setAssignments, setIsLoadingA), []);
  return (
    <div class="home">
      <h1 class="ctitle">CS224N: Natural Language Processing</h1>
      <Card title="Resources" style={{ width: "30rem", margin: "3rem auto" }}>
        <List
          dataSource={resources}
          loading={isLoadingR}
          renderItem={item => (
            <List.Item>
              <Link to={"/resource/" + item}>
                {prettify(item.substring(0, item.length - 4))}
              </Link>
            </List.Item>
          )}
          footer={
            props.prof ? (
              <Button icon={<PlusOutlined />}>Add resource</Button>
            ) : null
          }
        />
      </Card>
      <Card title="Assignments" style={{ width: "30rem", margin: "3rem auto" }}>
        <List
          dataSource={assignments}
          loading={isLoadingA}
          renderItem={item => (
            <List.Item>
              <Link to={"/assignment/" + item}>
                {prettify(item.substring(0, item.length - 4))}
              </Link>
            </List.Item>
          )}
          footer={
            props.prof ? (
              <Link to="/assignment/edit">
                <Button icon={<PlusOutlined />}>Create assignment</Button>
              </Link>
            ) : null
          }
        />
      </Card>
    </div>
  );
};

export default Home;
