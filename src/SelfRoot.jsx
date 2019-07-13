import React, { Component } from "react";
import TwoColumn from "./TwoColumn.jsx";
import FeedCard from "./FeedCard.jsx";
import StyledTextInput from "./FormTextInput.jsx";
import UpdatedInputButton from "./UpdatedInputButton.jsx";

const DeleteAccount = React.lazy(() => import("./self/DeleteAccount.jsx"));

class SelfRoot extends Component {
  state = {};

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
            <UpdatedInputButton type="submit" value="Update Password" />
          </section>
        </FeedCard>
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
        <React.Suspense fallback={"Loading Delete Operation..."}>
          <DeleteAccount />
        </React.Suspense>
      </TwoColumn>
    );
  }
}

export default SelfRoot;
