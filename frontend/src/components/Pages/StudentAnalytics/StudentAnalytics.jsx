import React, { useState, useEffect } from "react";
import { Layout, Button, List, Card, Alert } from "antd";
import { Link } from "react-router-dom";
import api from "api.js"
import EditableTagGroup from "../AssignmentEdit/TagGroup.js";

const { Header, Content, Footer } = Layout;

const ViewAssignment = props => {
  const [assignments, setAssignments] = useState([]);
  const [isLoadingA, setIsLoadingA] = useState(true);

   useEffect(
    () =>
      api(`/analytics/${props.match.params.id}`, setAssignments, setIsLoadingA),
    []
  );

   let str = props.match.params.id;
   str = str.substring(0, str.length - 4);
  return (
    <>
      <h1>{str}</h1>
      {assignments}
      <EditableTagGroup text={assignments} />
      <h1>Student Answer</h1>
      <Card> At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. 
      Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
       Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat
      </Card>
      <Alert message="9/10" type="warning" />
      <h1> Feedback & Study Suggestions </h1>
      <Card title="Question X"  
      extra={<a onClick={() => {
          alert("Coming soon!");}}>More</a>} style={{ width: '100%' }} >
        <p>Preview: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
      </Card>
    </>
  );
};

export default ViewAssignment;