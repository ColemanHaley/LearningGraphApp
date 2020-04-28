import React, { useState, useEffect } from "react";
import { Layout, Button, List } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import api from "api.js";

const { Header, Content, Footer } = Layout;

const prettify = str => {
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str.split("_").join(" ");
};

const Home = props => {
  const [resources, setResources] = useState([]);
  const [isLoadingR, setIsLoadingR] = useState(true);

  useEffect(
    () =>
      api(`/resource/${props.match.params.id}`, setResources, setIsLoadingR),
    []
  );
  let str = props.match.params.id;
  str = str.substring(0, str.length - 4);
  return (
    <div class="page-container">
      <div
        class="page-content"
        style={{ textAlign: "left", maxWidth: "800px", minWidth: "300px" }}
      >
        <h1>{prettify(str)}</h1>
        {resources}
      </div>
    </div>
  );
};

export default Home;
