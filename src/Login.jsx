import React, { Component } from "react";
import InfoText from "./InfoText.jsx";
import Card from "./Card.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import StyledLink from "./StyledLink.jsx";
import Form from "./Form.jsx";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleInputChange = e => {
    // let currInputValue = e.currentTarget.value;
    // let currInputName = e.currentTarget.name;
    const { value, name } = e.currentTarget;
    this.setState(prevState => {
      let change = {};
      switch (name) {
        case "email":
          change = { email: value };
          break;
        case "password":
          change = { password: value };
          break;
      }
      return Object.assign(prevState, change);
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    console.log("Logging in.");
    const url = "/api/login";
    const { email, password } = this.state;

    if (email === "" || password === "") {
      return;
    }

    axios
      .post(url, {
        email,
        password
      })
      .then(res => {
        console.log(res);
        console.log(res.data.message);
        this.setState(prevState => {
          return {
            ...prevState,
            email: "",
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
              email: "",
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
          emailValue={this.state.email}
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
