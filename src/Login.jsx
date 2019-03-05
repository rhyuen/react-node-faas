import React, { Component } from "react";
import InfoText from "./InfoText.jsx";
import Card from "./Card.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import StyledLink from "./StyledLink.jsx";
import Form from "./Form.jsx";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleInputChange = e => {
    let currInputValue = e.currentTarget.value;
    let currInputName = e.currentTarget.name;
    this.setState(prevState => {
      let change = {};
      switch (currInputName) {
        case "username":
          change = { username: currInputValue };
          break;
        case "password":
          change = { password: currInputValue };
          break;
      }
      return Object.assign(prevState, change);
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    console.log("Logging in.");
    const url = "/api/login";
    const username = this.state.username;
    const password = this.state.password;

    if (username === "" || password === "") {
      return;
    }

    axios
      .post(url, {
        username: username,
        password: password
      })
      .then(res => {
        console.log(res);
        this.setState(prevState => {
          return {
            ...prevState,
            username: "",
            password: ""
          };
        });
        window.location.assign("/me");
      })
      .catch(err => {
        if (err.response.status === 401) {
          console.log("Incorrect password.");
          this.setState(prevState => {
            return {
              ...prevState,
              password: ""
            };
          });
        }
        if (err.response.status === 404) {
          console.log("User does not exist.");
          this.setState(prevState => {
            return {
              ...prevState,
              username: "",
              password: ""
            };
          });
        }
      });
  };

  render() {
    return (
      <Card>
        <h1>Login</h1>
        <Form
          onInputChange={this.handleInputChange}
          usernameValue={this.state.username}
          passwordValue={this.state.password}
          onFormSubmit={this.handleFormSubmit}
        />
        <InfoText>
          Forgot your password? Click <StyledLink to="/forgot">Here</StyledLink>
        </InfoText>
      </Card>
    );
  }
}

export default Login;
