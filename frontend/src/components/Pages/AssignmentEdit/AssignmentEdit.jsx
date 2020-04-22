import React, { useState } from "react";
import { Layout, Button, List } from "antd";
import { Input, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import EditableTagGroup from "./TagGroup.js";
import api from "api.js";

const { TextArea } = Input;

const Edit = () => {
  const [data, setData] = useState([["Enter Problem", 0]]);
  const [count, setCount] = useState(0);
  return (
    <div class="page-container">
      <div class="page-content" style={{ minWidth: "800px" }}>
        <h1>Edit Assignment</h1>
        <List
          dataSource={data}
          renderItem={item => (
            <div style={{ textAlign: "left" }}>
              <h2>Problem 1</h2>
              <TextArea
                rows={8}
                value={item[0]}
                onChange={e => {
                  const d = data.slice();
                  d[item[1]] = [e.target.value, item[1]];
                  setData(d);
                }}
              />
              {/* <Tag closable onClose ={() => alert('Click')}>Sample Tag</Tag> */}
              <div style={{ marginTop: "1rem" }}>
                <EditableTagGroup text={item[0]} />
              </div>
            </div>
          )}
          footer={
            <Button
              icon={<PlusOutlined />}
              onClick={() => {
                setData(data.concat([["a", count + 1]]));
                setCount(count + 1);
              }}
            >
              {" "}
              Add Problem{" "}
            </Button>
          }
        />

        <Button
          type="primary"
          block
          onClick={() => {
            alert("Coming soon!");
            // to implement
            // var file = new Blob(data, {type: 'text/plain'})
            // var a = document.createElement("a")
            // var url = URL.createObjectURL(file)
            // a.href = url
            // a.download = "assignment_" + count + ".txt"
            // a.click()
          }}
        >
          {" "}
          Submit{" "}
        </Button>
      </div>
    </div>
  );
};

export default Edit;
