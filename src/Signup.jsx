import React, { Component } from "react";
import Card from "./Card.jsx";
import FormButton from "./FormButton.jsx";
import TextInput from "./FormTextInput.jsx";
import InfoText from "./InfoText.jsx";
import Modal from "./Modal.jsx";
import PrimaryColourHeader from "./shared/PrimaryColourHeader.jsx";
import { Link } from "react-router-dom";
import StyledLink from "./StyledLink.jsx";
import axios from "axios";
import validator from "validator";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    passwordConfirmation: "",
    isPasswordValid: false,
    isPasswordMatch: false,
    isPasswordVisible: false,
    isConfirmationVisible: false,
    isEmailDuplicateModalVisible: false
  };

  handleInputChange = e => {
    let currInputValue = e.currentTarget.value;
    let currInputName = e.currentTarget.name;
    this.setState(prevState => {
      let change = {};
      switch (currInputName) {
        case "email":
          change = { email: currInputValue };
          break;
        case "password":
          change = { password: currInputValue };
          break;
        case "passwordConfirmation":
          change = { passwordConfirmation: currInputValue };
          break;
      }
      return Object.assign(prevState, change);
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;

    if (!validator.isEmail(email)) {
      //MR25, Add Warning for Invalid Email
      return this.setState({ email: "" });
    }

    const url = "/api/signup";
    const signupDetails = { email, password };
    axios
      .post(url, signupDetails)
      .then(res => {
        console.log(res.data);
        this.setState(prevState => {
          return {
            ...prevState,
            email: "",
            password: "",
            passwordConfirmation: "",
            isConfirmationVisible: true
          };
        });
      })
      .catch(err => {
        console.log("There was an error that occurred.");
        console.log(err.response.data.details);
        console.log(err.response.data);

        //Username/Email Id already taken.
        if (err.response.status === 400) {
          this.setState(prevState => {
            return {
              ...prevState,
              email: "",
              isEmailDuplicateModalVisible: true
            };
          });
        } else {
          this.setState(prevState => {
            return {
              ...prevState,
              email: "",
              password: "",
              passwordConfirmation: ""
            };
          });
        }
      });
  };

  handlePasswordVisibleClick = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        isPasswordVisible: !prevState.isPasswordVisible
      };
    });
  };

  isFormSubmitValid = () => {
    const characterMin = 8;
    const { email, password, passwordConfirmation } = this.state;
    if (email === "" || password === "" || passwordConfirmation === "") {
      return false;
    } else if (
      password.length < characterMin ||
      passwordConfirmation < characterMin
    ) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  handleModalClose = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        isEmailDuplicateModalVisible: false,
        isConfirmationVisible: false
      };
    });
  };

  render() {
    const isPasswordVisible = this.state.isPasswordVisible
      ? "text"
      : "password";

    const isSubmitValid = this.isFormSubmitValid();

    return (
      <Card>
        {this.state.isEmailDuplicateModalVisible ? (
          <Modal handleCloseButton={this.handleModalClose}>
            That Identifier is already taken.
          </Modal>
        ) : null}

        {this.state.isConfirmationVisible ? (
          <Modal handleCloseButton={this.handleModalClose}>
            Your account has been created. Click <Link to="/">here</Link> to
            login.
          </Modal>
        ) : null}

        <div>
          <PrimaryColourHeader>Signup for OLIA Bank</PrimaryColourHeader>
          <form onSubmit={this.handleSubmit}>
            <TextInput
              type="text"
              placeholder="Enter your email address."
              name="email"
              onChange={this.handleInputChange}
              value={this.state.email}
            />
            <br />
            <TextInput
              type={isPasswordVisible}
              placeholder="Enter your password."
              name="password"
              onChange={this.handleInputChange}
              value={this.state.password}
            />
            <br />
            <TextInput
              type={isPasswordVisible}
              placeholder="Retype your password."
              name="passwordConfirmation"
              onChange={this.handleInputChange}
              value={this.state.passwordConfirmation}
            />
            <span>
              <label htmlFor="passwordVisible">
                <input
                  type="checkbox"
                  id="passwordVisible"
                  onClick={this.handlePasswordVisibleClick}
                />
                Password Visible
              </label>
            </span>
            <br />
            <InfoText>
              Use at least <strong>8 characters</strong>.
            </InfoText>
            <FormButton
              type="submit"
              value="Signup"
              disabled={!isSubmitValid}
              onClick={this.handleSubmit}
            />
          </form>
          <InfoText>
            Already have an account? Login <StyledLink to="/">here</StyledLink>.
          </InfoText>
        </div>
      </Card>
    );
  }
}

export default Signup;
