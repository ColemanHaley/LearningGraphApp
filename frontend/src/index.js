import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Layout } from "antd";
import Header from "./components/Header/Header";
import Home from "./components/Pages/Home/Home";
import CourseSetUp from "./components/Pages/ProfessorSetUp/ProfessorSetUp";
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
import Login from "./components/Pages/Login/Login";
import api from "api.js";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [professor, setProfessor] = React.useState(null);
  //const home = loggedIn ? Home : LandingPage;
  React.useEffect(() => setLoggedIn(sessionStorage.getItem("terrazzo_access")));
  const sLI = val => setLoggedIn(val);
  return (
    <div className="App">
      <Router>
        <Layout>
          <Layout.Header>
            <Header loggedIn={loggedIn} prof={professor} />
          </Layout.Header>
          <Layout.Content>
            <Switch>
              <Route exact path="/">
                {loggedIn ? <Home prof={professor} /> : <LandingPage />}
              </Route>
              <Route path="/resource/:id" component={Resource} />
              <Route
                path="/sign-up/"
                render={() => (
                  <SignUp
                    setLoggedIn={setLoggedIn}
                    prof={professor}
                    setProfessor={setProfessor}
                  />
                )}
              />
              <Route
                path="/assignment/edit/"
                render={() => <AssignmentEdit prof={professor} />}
              />
              <Route
                path="/course-setup/"
                render={() => <CourseSetUp prof={professor} />}
              />
              <Route
                path="/assignment/:id"
                render={props => <Assignment prof={professor} {...props} />}
              />
              <Route
                path="/student/"
                render={() => <StudentView prof={professor} />}
              />
              <Route path="/login/" render={() => <Login />} />
              <Route
                path="/analytics/:id"
                render={props => (
                  <StudentAnalytics prof={professor} {...props} />
                )}
              />
              <Route
                path="/info/"
                render={() => <CourseInfo prof={professor} />}
              />
              <Route
                path="/prof_analytics/"
                render={() => <ProfAnalytics prof={professor} />}
              />
              <Route
                path="/student_answers/"
                render={() => <IndivAnswers prof={professor} />}
              />
            </Switch>
          </Layout.Content>
        </Layout>
      </Router>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
