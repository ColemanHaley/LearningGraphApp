import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Header, Content, Footer } = Layout;

const loggedInMenu = (
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
    <Menu.Item key="3">
      <Link to = "/prof_analytics/"> Professor Analytics </Link>
    </Menu.Item>
  </Menu>
);

const TopBar = props => {
  const loggedOutMenu = (
    <Menu
      theme="dark"
      id="top-menu"
      mode="horizontal"
      defaultSelectedKeys={["2"]}
      style={{ lineHeight: "64px" }}
    >
      <Menu.Item key="1">
        {/*<Link to="/login/">Log in</Link>*/}
        <div onClick={() => props.setLoggedIn(true)}>Log in</div>
      </Menu.Item>
    </Menu>
  );
  const menu = props.loggedIn ? loggedInMenu : loggedOutMenu;
  return (
    <>
      <Link to="/">
        <div className="logo">terrazzo</div>
      </Link>

      {menu}
    </>
  );
};

export default TopBar;
