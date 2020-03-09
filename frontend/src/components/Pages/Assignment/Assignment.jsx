import React, { useState, useEffect } from "react";
import { Layout, Button, List } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import api from "api.js";

const { Header, Content, Footer } = Layout;
const ViewAssignment = props => {
  const [assignments, setAssignments] = useState([]);
  const [isLoadingA, setIsLoadingA] = useState(true);
   useEffect(
    () =>
      api(`/assignments/${props.match.params.id}`, setAssignments, setIsLoadingA),
    []
  );
  return (
    <>
      <h1>{props.match.params.id}</h1>
      {assignments}
    </>
  );
};

export default ViewAssignment;