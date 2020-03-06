import React, { Component } from "react";
import FeedCard from "../FeedCard.jsx";
import StyledTextInput from "../FormTextInput.jsx";
import UpdatedInputButton from "../UpdatedInputButton.jsx";

class ChangeEmail extends Component {
  render() {
    return (
      <FeedCard>
        <h1>Change Email</h1>
        <section>
          <StyledTextInput
            type="text"
            placeholder="Email you signed in with."
          />
          <StyledTextInput type="text" placeholder="Your updated email." />
          <UpdatedInputButton type="submit" value="Change Email" />
        </section>
      </FeedCard>
    );
  }
}

export default ChangeEmail;
