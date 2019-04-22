import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import TwoColumn from "./TwoColumn.jsx";
import Accounts from "./Accounts.jsx";
import Transactions from "./Transactions.jsx";

class Me extends Component {
  state = {
    data: ""
  };
  componentDidMount() {
    axios
      .get("/api/user", { useCredentials: true })
      .then(res => {
        console.log(res.data.data);
        const payload = res.data.data;

        this.setState({
          data: payload[0]
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { onLogout } = this.props;
    const { email, password, user_id } = this.state.data;
    return (
      <TwoColumn>
        <FeedCard>
          <h1>"You're now logged in."</h1>
          <p>email:{email}</p>
          <p>password:{password}</p>
          <p>user_id:{user_id}</p>
        </FeedCard>
        <FeedCard>
          <Accounts />
        </FeedCard>
        <FeedCard>
          <Transactions />
        </FeedCard>
      </TwoColumn>
    );
  }
}

export default Me;

const FeedCard = styled.div`
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  width: 100%;
  margin-bottom: 20px;
`;
