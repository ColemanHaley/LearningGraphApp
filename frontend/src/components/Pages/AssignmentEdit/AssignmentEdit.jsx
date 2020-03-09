import React, {useState} from "react";
import { Layout, Button, List } from "antd";
import { Input, Tag } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import EditableTagGroup from "./TagGroup.js"

const { TextArea } = Input;

const Edit = () => {
	const [data, setData] = useState([['a',0]]);
	const [count, setCount] = useState(0)
  return (
    <>
      <h1>Edit Assignment</h1>
      <List
      	dataSource = {data}
      	renderItem={item => (
      		<>
      		<TextArea rows={4} value={item[0]} 
      			onChange= { 
      				(e) => {
      					const d = data.slice()
      					d[item[1]] = [e.target.value, item[1]]
      					setData(d)
      				}
      			} 
      		/>
      		{/* <Tag closable onClose ={() => alert('Click')}>Sample Tag</Tag> */}
      		<EditableTagGroup />
      		</>
      	)}

        footer={  
        	<Button icon={<PlusOutlined />} 
        		onClick={
        			() => {
  						setData(data.concat([['a',count+1]]))
        				setCount(count+1)
        			}
        		}
        	> Add Problem </Button>
        }
      />

      <Button type ="primary" block 
      		onClick = {
      			()=> {
      				alert('Coming soon!');
      				// to implement
      				// var file = new Blob(data, {type: 'text/plain'})
      				// var a = document.createElement("a")
      				// var url = URL.createObjectURL(file)
      				// a.href = url
      				// a.download = "assignment_" + count + ".txt"
      				// a.click()
      			}
      		}
       > Submit </Button>
    </>
  );
};

export default Edit;
