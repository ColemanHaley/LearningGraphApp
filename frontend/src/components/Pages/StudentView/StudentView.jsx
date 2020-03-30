import React, { useState, useEffect } from "react";
import { Layout, Button, List } from "antd";
import { Statistic, Row, Col, Card } from 'antd';
import { Link } from "react-router-dom";
import { LikeOutlined } from '@ant-design/icons';
import { PlusOutlined } from "@ant-design/icons";
import api from "api.js";

const { Header, Content, Footer } = Layout;

/*make dynamic so more Assignments can be added*/
const StudentView = () => {
	const [resources, setResources] = useState([]);
  	const [isLoadingR, setIsLoadingR] = useState(true);
	const [assignments, setAssignments] = useState([]);
	const [isLoadingA, setIsLoadingA] = useState(true);

  	useEffect(() => api(`/`, setResources, setIsLoadingR), []);
  	useEffect(() => api('/assignment/', setAssignments, setIsLoadingA), []);

	return (
        <>
        <h1>Assignments</h1>
        <List
        dataSource={assignments}
        loading={isLoadingA}
        renderItem={item => (
        	<>
          <List.Item>
            <h3>{item}</h3>
          </List.Item>
          <List.Item>
            <Row gutter={16}>	
	        <Col>
	        	<div onClick={() => {window.open('/assignment/' + item);}}>
	        		<Card hoverable>
		      			<Statistic title="Feedback" value={'View Feedback'} prefix={<LikeOutlined />} />
		      			
		    		</Card>
		    	</div>
		    </Col>
        	<Col >
        		<Card>
		    	<Statistic title="Score" value={Math.ceil(Math.random() * 51) + 50} suffix="/ 100" />
		    	</Card>
		    </Col>
        </Row>
          </List.Item>
          </>
        )}
      />
        
        <h1>Resources</h1>
	    <List
	        dataSource={resources}
	        loading={isLoadingR}
	        renderItem={item => (
	          <List.Item>
	            <Link to={"/resource/" + item}>{item}</Link>
	          </List.Item>
	        )}
	      />  
        </>

	);
};

export default StudentView;