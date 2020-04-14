import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Layout } from "antd";
import Header from "./components/Header/Header";
import Home from "./components/Pages/Home/Home";
import LandingPage from "./components/Pages/Landing/Landing";
import AssignmentEdit from "./components/Pages/AssignmentEdit/AssignmentEdit";
import Assignment from "./components/Pages/Assignment/Assignment";
import Resource from "./components/Pages/Resource/Resource";
import SignUp from "./components/Pages/SignUp/SignUp";
import StudentView from "./components/Pages/StudentView/StudentView";
import StudentAnalytics from "./components/Pages/StudentAnalytics/StudentAnalytics";
import ProfAnalytics from "./components/Pages/ProfAnalytics/ProfAnalytics";
import CourseInfo from "./components/Pages/CourseInfo/CourseInfo";
import IndivAnswers from "./components/Pages/IndivAnswers/IndivAnswers";
import "./App.scss";
import "./index.scss";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  //const home = loggedIn ? Home : LandingPage;
  const sLI = val => setLoggedIn(val);
  return (
    <div className="App">
      <Router>
        <Layout>
          <Layout.Header>
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          </Layout.Header>
          <Layout.Content>
            <Switch>
              <Route exact path="/">
                {loggedIn ? <Home /> : <LandingPage />}
              </Route>
              <Route path="/resource/:id" component={Resource} />
              <Route
                path="/sign-up/"
                render={() => <SignUp setLoggedIn={setLoggedIn} />}
              />
              <Route path="/assignment/edit/" component={AssignmentEdit} />
              <Route path="/assignment/:id" component={Assignment} />
              <Route path="/student/" component={StudentView} />
              <Route path="/analytics/:id" component={StudentAnalytics} />
              <Route path="/info/" component={CourseInfo} />
              <Route path="/prof_analytics/" component={ProfAnalytics} />
              <Route path="/student_answers/" component={IndivAnswers} />
            </Switch>
          </Layout.Content>
        </Layout>
      </Router>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
