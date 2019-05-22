import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Nav from "./Nav.jsx";
import Login from "./Login.jsx";
import Me from "./Me.jsx";
import axios from "axios";
import Signup from "./Signup.jsx";
import Forgot from "./Forgot.jsx";
import AccountsHome from "./AccountsHome.jsx";
import AccountSingle from "./AccountSingle.jsx";
import { Provider } from "./Context.jsx";

const currentTheme = {
  primaryColour: "#4842b7",
  backgroundColour: "#f9f9f9",
  borderColour: "rgba(0, 0, 0, 0.1)"
};

const Root = styled.div`
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const RootContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RouteContainer = styled.div`
  position: relative;
  top: 5vh;
  background: ${currentTheme.backgroundColour};
  width: 100%;
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class App extends Component {
  state = {
    loggedIn: false,
    userContext: {}
  };

  componentDidMount() {}

  handleLogin = () => {
    this.setState(ps => {
      return { ...ps, loggedIn: !ps.loggedIn };
    });
  };

  handleSaveUserToContext = details => {
    this.setState({
      userContext: details
    });
  };

  handleLogout = () => {
    axios
      .get("/api/logout", { withCredentials: true })
      .then(res => {
        console.log(res.data.message);
        this.setState({
          loggedIn: false
        });
      })
      .catch(e => {
        console.log(e);
      });
  };
  render() {
    return (
      <Root>
        <Provider value={this.state.userContext}>
          <Router>
            <ThemeProvider theme={currentTheme}>
              <RootContent>
                {this.state.loggedIn ? (
                  <Nav onLogout={this.handleLogout} />
                ) : null}

                <RouteContainer>
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
                  <Route
                    exact
                    path="/account/:account_id"
                    component={AccountSingle}
                  />
                  <Route exact path="/account" component={AccountsHome} />
                  <Route
                    exact
                    path="/me"
                    render={() =>
                      !this.state.loggedIn ? (
                        <Redirect to="/" />
                      ) : (
                        <Me
                          onLogout={this.handleLogout}
                          saveUserToContext={this.handleSaveUserToContext}
                        />
                      )
                    }
                  />
                </RouteContainer>
              </RootContent>
            </ThemeProvider>
          </Router>
        </Provider>
      </Root>
    );
  }
}

export default hot(module)(App);
