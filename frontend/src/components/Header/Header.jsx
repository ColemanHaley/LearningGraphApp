import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Header, Content, Footer } = Layout;

const TopBar = () => {
  return (
    <>
      <Link to="/">
        <div className="logo" />
      </Link>
      <Menu
        theme="dark"
        id="top-menu"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        style={{ lineHeight: "64px" }}
      >
        {/* <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item> */}
      </Menu>
    </>
  );
};

export default TopBar;
