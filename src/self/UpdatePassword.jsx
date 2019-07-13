import React, { Component } from "react";
import FeedCard from "../FeedCard.jsx";
import StyledTextInput from "../FormTextInput.jsx";
import UpdatedInputButton from "../UpdatedInputButton.jsx";

class UpdatePassword extends Component {
  render() {
    return (
      <FeedCard>
        <h1>Change Password</h1>
        <section>
          <StyledTextInput
            type="password"
            placeholder="Your current password here."
          />
          <StyledTextInput type="password" placeholder="Your new password." />
          <StyledTextInput
            type="password"
            placeholder="The new password again."
          />
          <UpdatedInputButton type="submit" value="Update Password" />
        </section>
      </FeedCard>
    );
  }
}

export default UpdatePassword;
