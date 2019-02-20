import React, { Component } from "react";
import { hot } from "react-hot-loader";

class App extends Component {
  state = {};

  componentDidMount() {}

  render() {
    return <div className="root">hi, serverless</div>;
  }
}

export default hot(module)(App);
