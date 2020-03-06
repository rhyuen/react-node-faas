import React, { Component } from "react";
import InfoText from "./InfoText.jsx";
import FormButton from "./FormButton.jsx";
import Card from "./Card.jsx";
import validator from "validator";
import TextInput from "./FormTextInput.jsx";
import PrimaryColourHeader from "./shared/PrimaryColourHeader.jsx";
import StyledLink from "./StyledLink.jsx";
import Modal from "./Modal.jsx";

class Forgot extends Component {
  state = {
    email: "",
    isInvalidEmail: false,
    isEmailConfirmationVisible: false
  };

  handleChange = e => {
    const currentValue = e.currentTarget.value;
    this.setState(prevState => {
      return {
        ...prevState,
        email: currentValue
      };
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!validator.isEmail(this.state.email)) {
      return this.setState({ isInvalidEmail: true });
    }
    this.setState(prevState => {
      return {
        ...prevState,
        email: "",
        isEmailConfirmationVisible: true
      };
    });
  };

  handleModalClose = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        isEmailConfirmationVisible: false
      };
    });
  };

  render() {
    return (
      <Card>
        {this.state.isEmailConfirmationVisible ? (
          <Modal handleCloseButton={this.handleModalClose}>
            An email with directions on what to do will arrive shortly.  Go back to &nbsp;
            <StyledLink to="/">login</StyledLink>
          </Modal>
        ) : null}

        <PrimaryColourHeader>Account Recovery</PrimaryColourHeader>
        <form onSubmit={this.handleSubmit}>
          <TextInput
            type="text"
            placeholder="Enter your email address."
            onChange={this.handleChange}
            value={this.state.email}
            name="email"
          />
          <br />
          {this.state.isInvalidEmail ? (
            <InfoText>The above is not a valid email address.</InfoText>
          ) : null}
          <FormButton type="submit" value="Submit" />
        </form>
        <InfoText>
          I had an <StyledLink to="/">Epiphany</StyledLink> (I remembered my
          credentials).
        </InfoText>
      </Card>
    );
  }
}

export default Forgot;
