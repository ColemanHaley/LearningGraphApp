import React, { useState, useEffect } from "react";
import { Layout, Button, List } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import api from "api.js";
import EditableTagGroup from "../AssignmentEdit/TagGroup.js";

const { Header, Content, Footer } = Layout;

const ViewAssignment = props => {
  const [assignments, setAssignments] = useState([]);
  const [isLoadingA, setIsLoadingA] = useState(true);

  useEffect(
    () =>
      api(
        `/assignment/${props.match.params.id}`,
        setAssignments,
        setIsLoadingA
      ),
    []
  );
  let str = props.match.params.id;
  str = str.substring(0, str.length - 4);
  return (
    <>
      <h1>{str}</h1>
      {assignments}
      <EditableTagGroup text={assignments} />
    </>
  );
};

export default ViewAssignment;
