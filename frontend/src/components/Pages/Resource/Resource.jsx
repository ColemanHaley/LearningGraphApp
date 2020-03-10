import React, { useState, useEffect } from "react";
import { Layout, Button, List } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import api from "api.js";

const { Header, Content, Footer } = Layout;

const Home = props => {
  const [resources, setResources] = useState([]);
  const [isLoadingR, setIsLoadingR] = useState(true);

  useEffect(
    () =>
      api(`/resource/${props.match.params.id}`, setResources, setIsLoadingR),
    []
  );
  return (
    <>
      <h1>{props.match.params.id}</h1>
      {resources}
    </>
  );
};

export default Home;
