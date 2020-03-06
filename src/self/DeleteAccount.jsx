import React, { Component } from "react";
import FeedCard from "../FeedCard.jsx";
import StyledTextInput from "../FormTextInput.jsx";
import UpdatedInputButton from "../UpdatedInputButton.jsx";

class DeleteAccount extends Component {
  render() {
    return (
      <FeedCard>
        <h1>Delete Account</h1>
        <section>
          <p>
            If you're sure you want to delete your account. Type the email
            address you logged in with below and then click 'Delete Account'.
          </p>
          <StyledTextInput type="text" placeholder="Your Email Here." />
          <UpdatedInputButton type="submit" value="Delete Account" />
        </section>
      </FeedCard>
    );
  }
}

export default DeleteAccount;
