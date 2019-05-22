import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

class AccountSingle extends Component {
  state = {};
  componentDidMount() {
    console.log(this.props.match.params.account_id);
  }
  render() {
    return <div>This is an individual account</div>;
  }
}

export default AccountSingle;
