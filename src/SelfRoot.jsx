import React, { Component } from "react";
import TwoColumn from "./TwoColumn.jsx";
import FeedCard from "./FeedCard.jsx";
import StyledTextInput from "./FormTextInput.jsx";
import UpdatedInputButton from "./UpdatedInputButton.jsx";

class SelfRoot extends Component {
  state = {};

  componentDidMount() {}

  handleChange = e => {};

  render() {
    return (
      <TwoColumn>
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
            <UpdatedInputButton type="submit" value="Update" />
          </section>
        </FeedCard>
        <FeedCard>
          <h1>Change Email</h1>
          <section>change Email details</section>
        </FeedCard>
        <FeedCard>
          <h1>Delete Account</h1>
          <section>delete account details.</section>
        </FeedCard>
      </TwoColumn>
    );
  }
}

export default SelfRoot;
