import React, { Component } from "react";
import StyledLink from "./StyledLink.jsx";
import InfoText from "./InfoText.jsx";
import FormButton from "./FormButton.jsx";
import TextInput from "./FormTextInput.jsx";

export default ({
  onFormSubmit,
  onInputChange,
  usernameValue,
  passwordValue
}) => {
  return (
    <form onSubmit={onFormSubmit}>
      <div>
        <TextInput
          type="text"
          placeholder="Username"
          name="username"
          onChange={onInputChange}
          value={usernameValue}
        />
      </div>
      <div>
        <TextInput
          type="password"
          placeholder="Password"
          name="password"
          onChange={onInputChange}
          value={passwordValue}
        />
      </div>
      <InfoText>
        Not a user yet? Sign up <StyledLink to="/signup">Here</StyledLink>.
      </InfoText>
      <div>
        <FormButton type="submit" value="Login" />
      </div>
    </form>
  );
};
