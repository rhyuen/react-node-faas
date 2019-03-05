import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Login from "./Login.jsx";
import Me from "./Me.jsx";
import Signup from "./Signup.jsx";
import Forgot from "./Forgot.jsx";

const theme = {
  primaryColour: "#4842b7",
  inactiveColour: "rgba(0,0,0,0.1)",
  backgroundColour: "#F9F9F9"
};
const App = () => {
  return (
    <div className="root">
      <Router>
        <ThemeProvider theme={theme}>
          <div>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/forgot" component={Forgot} />
            <Route exact path="/me" component={Me} />
          </div>
        </ThemeProvider>
      </Router>
    </div>
  );
};

export default hot(module)(App);
