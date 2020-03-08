import React from "React";
import { Button, List } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import "./Home.scss";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Resources</h1>
      <List />
      <h1>Assignments</h1>
      <List
        footer={
          <Button icon={<PlusOutlined onClick={console.log(window)} />}>
            Create an Assignment
          </Button>
        }
      />
    </div>
  );
};

export default Home;
