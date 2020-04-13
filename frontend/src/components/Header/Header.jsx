import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Header, Content, Footer } = Layout;

const TopBar = () => {
  return (
    <>
      <Link to="/">
        <div className="logo">terrazzo</div>
      </Link>

      <Menu
        theme="dark"
        id="top-menu"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        style={{ lineHeight: "64px" }}
      >
        <Menu.Item key="1">
          <Link to="/info/">Course Info </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/student/"> Student View </Link>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default TopBar;
