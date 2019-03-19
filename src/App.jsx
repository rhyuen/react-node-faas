import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Login from "./Login.jsx";
import Me from "./Me.jsx";
import Signup from "./Signup.jsx";
import Forgot from "./Forgot.jsx";
import Generic from "./Generic.jsx";

const theme = {
  primaryColour: "#4842b7",
  inactiveColour: "rgba(0,0,0,0.1)",
  backgroundColour: "#F9F9F9"
};
class App extends Component {
  state = {
    loggedIn: false
  };

  handleLogin = () => {
    this.setState(ps => {
      return { ...ps, loggedIn: !ps.loggedIn };
    });
  };

  handleLogout = () => {
    this.setState({
      loggedIn: false
    });
  };
  render() {
    return (
      <div className="root">
        <Router>
          <ThemeProvider theme={theme}>
            <div>
              <Route
                exact
                path="/"
                render={() =>
                  this.state.loggedIn ? (
                    <Redirect to="/me" />
                  ) : (
                    <Login onLogin={this.handleLogin} />
                  )
                }
              />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/forgot" component={Forgot} />
              <Route exact path="/generic" component={Generic} />
              <Route
                exact
                path="/me"
                render={() =>
                  !this.state.loggedIn ? (
                    <Redirect to="/" />
                  ) : (
                    <Me onLogout={this.handleLogout} />
                  )
                }
              />
            </div>
          </ThemeProvider>
        </Router>
      </div>
    );
  }
}

export default hot(module)(App);
