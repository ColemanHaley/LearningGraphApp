import React, { useState, useEffect } from "react";
import { Layout, Button, List } from "antd";
import { Statistic, Row, Col, Card } from "antd";
import { Link } from "react-router-dom";
import { BarChartOutlined } from "@ant-design/icons";
import api from "api.js";
import "./StudentView.scss";

const { Header, Content, Footer } = Layout;

const prettify = str => {
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str.split("_").join(" ");
};

/*make dynamic so more Assignments can be added*/
const StudentView = () => {
  const [resources, setResources] = useState([]);
  const [isLoadingR, setIsLoadingR] = useState(true);
  const [assignments, setAssignments] = useState([]);
  const [isLoadingA, setIsLoadingA] = useState(true);

  useEffect(() => api(`/`, setResources, setIsLoadingR), []);
  useEffect(() => api("/assignment/", setAssignments, setIsLoadingA), []);

  return (
    <div id="studentview">
      <div class="sv">
        <h1>Assignments</h1>
        <List
          dataSource={assignments}
          loading={isLoadingA}
          style={{ maxWidth: "500px" }}
          renderItem={item => (
            <>
              <List.Item>
                <h3>{prettify(item.substring(0, item.length - 4))}</h3>
              </List.Item>
              <List.Item>
                <Row gutter={16}>
                  <Col>
                    <Link to={"/analytics" + item}>
                      <Card hoverable>
                        <Statistic
                          title="Feedback"
                          value={"View Feedback"}
                          prefix={<BarChartOutlined />}
                        />
                      </Card>
                    </Link>
                  </Col>
                  <Col>
                    <Card>
                      <Statistic title="Score" value={85} suffix="/ 100" />
                    </Card>
                  </Col>
                </Row>
              </List.Item>
            </>
          )}
        />

        <h1>Class Resources</h1>
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
        />
      </div>
    </div>
  );
};

export default StudentView;
