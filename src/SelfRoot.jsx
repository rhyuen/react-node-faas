import React, { Component } from "react";
import TwoColumn from "./TwoColumn.jsx";
import LoadingPlaceholder from "./LoadingPlaceholder.jsx";

const UpdatePassword = React.lazy(() => import("./self/UpdatePassword.jsx"));
const ChangeEmail = React.lazy(() => import("./self/ChangeEmail.jsx"));
const DeleteAccount = React.lazy(() => import("./self/DeleteAccount.jsx"));

class SelfRoot extends Component {
  state = {};

  handleChange = e => {};

  render() {
    return (
      <TwoColumn>
        <React.Suspense
          fallback={<LoadingPlaceholder message="Loading update password..." />}
        >
          <UpdatePassword />
        </React.Suspense>
        <React.Suspense
          fallback={<LoadingPlaceholder message="Loading change email..." />}
        >
          <ChangeEmail />
        </React.Suspense>
        <React.Suspense
          fallback={<LoadingPlaceholder message="Loading delete account..." />}
        >
          <DeleteAccount />
        </React.Suspense>
      </TwoColumn>
    );
  }
}

export default SelfRoot;
