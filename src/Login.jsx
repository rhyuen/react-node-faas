import React, { Component } from "react";
import styled from "styled-components";
import InfoText from "./InfoText.jsx";
import Card from "./Card.jsx";
import axios from "axios";
import StyledLink from "./StyledLink.jsx";
import Form from "./Form.jsx";
import validator from "validator";

class Login extends Component {
  state = {
    email: "",
    password: "",
    failedSubmissionWarning: false
  };

  handleInputChange = e => {
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
      if (prevState.failedSubmissionWarning === true) {
        const warningOff = { failedSubmissionWarning: false };
        Object.assign(change, warningOff);
      }
      return Object.assign(prevState, change);
    });
  };

  isValidForm = () => {
    const { email, password } = this.state;

    //No email, no password
    if (email === "" || password === "") {
      return false;
    }

    //Invalid email
    if (!validator.isEmail(email)) {
      return false;
    }

    return true;
  };

  handleFormSubmit = e => {
    e.preventDefault();
    console.log("Data submitted for login");
    const url = "/api/login";
    const { email, password } = this.state;

    //Add validation here again.
    //The one bound to the UI button is for UI purposes.

    axios
      .post(url, {
        email,
        password
      })
      .then(res => {
        console.log(res.data);
        this.setState(prevState => {
          return {
            ...prevState,
            email: "",
            password: ""
          };
        });
        this.props.onLogin();

        //do stuff here.
        //this.props.history.push("/me");
      })
      .catch(error => {
        if (error.response.status === 401) {
          console.log("Incorrect password.");
          this.setState(prevState => {
            return {
              ...prevState,
              password: "",
              failedSubmissionWarning: true
            };
          });
        }
        if (error.response.status === 404) {
          console.log("User does not exist.");
          this.setState(prevState => {
            return {
              ...prevState,
              email: "",
              password: "",
              failedSubmissionWarning: true
            };
          });
        }
        if (error.response.status === 400) {
          console.log(error.message);
        }
        console.log(error.response.data.details);
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
          onValidForm={this.isValidForm}
          failedSubmissionWarning={this.state.failedSubmissionWarning}
        />
        <InfoText>
          Forgot your password? Click <StyledLink to="/forgot">Here</StyledLink>
        </InfoText>
      </Card>
    );
  }
}

export default Login;
