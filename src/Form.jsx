import React, { Component } from "react";
import StyledLink from "./StyledLink.jsx";
import InfoText from "./InfoText.jsx";
import FormButton from "./FormButton.jsx";
import TextInput from "./FormTextInput.jsx";
import WarningBox from "./WarningBox.jsx";

export default ({
  onFormSubmit,
  onInputChange,
  emailValue,
  passwordValue,
  onValidForm,
  failedSubmissionWarning
}) => {
  return (
    <form onSubmit={onFormSubmit}>
      <div>
        <TextInput
          type="text"
          placeholder="Email"
          name="email"
          onChange={onInputChange}
          value={emailValue}
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
        <FormButton type="submit" value="Login" disabled={!onValidForm()} />
        {failedSubmissionWarning ? (
          <WarningBox>Invalid credentials.</WarningBox>
        ) : null}
      </div>
    </form>
  );
};
