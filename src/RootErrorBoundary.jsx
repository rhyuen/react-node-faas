import React, { Component } from "react";
import styled from "styled-components";
import FeedCard from "./FeedCard.jsx";

const ErrorCard = styled(FeedCard)`
  margin-top: 50px;
  background-color: papayawhip;
`;

export default class RootErrorBoundary extends Component {
  state = {
    isError: false
  };

  static getDerivedStateFromError() {
    return { isError: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
    console.log(info);
  }

  render() {
    const { isError } = this.state;
    const { children } = this.props;
    return isError ? (
      <ErrorCard>
        <h1>Somehow, we've come across some computer problems.</h1>
        <p>
          An error occurred has unforuntately occurred. Click{" "}
          <a href="/">Here</a> to go back to the home page.
        </p>
      </ErrorCard>
    ) : (
      children
    );
  }
}
