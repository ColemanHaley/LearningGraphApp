import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Layout } from "antd";
import Header from "./components/Header/Header";
import Home from "./components/Pages/Home/Home";
import AssignmentEdit from "./components/Pages/AssignmentEdit/AssignmentEdit";
import Assignment from "./components/Pages/Assignment/Assignment";
import Resource from "./components/Pages/Resource/Resource";
import StudentView from "./components/Pages/StudentView/StudentView";
import StudentAnalytics from "./components/Pages/StudentAnalytics/StudentAnalytics";
import CourseInfo from "./components/Pages/CourseInfo/CourseInfo";
import "./App.scss";
import "./index.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Layout.Header>
            <Header />
          </Layout.Header>
          <Layout.Content>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/resource/:id" component={Resource} />
              <Route path="/assignment/edit/" component={AssignmentEdit} />
              <Route path="/assignment/:id" component={Assignment} />
              <Route path = "/student/" component={StudentView} />
              <Route path = "/analytics/:id" component={StudentAnalytics} />
              <Route path = "/info/" component={CourseInfo} />
            </Switch>
          </Layout.Content>
        </Layout>
      </Router>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
