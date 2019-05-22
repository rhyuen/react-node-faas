import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import TwoColumn from "./TwoColumn.jsx";
import Accounts from "./Accounts.jsx";
import Transactions from "./Transactions.jsx";

const FeedCard = styled.div`
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  width: 100%;
  margin-bottom: 20px;
`;

class Me extends Component {
  state = {
    email: "",
    user_id: "",
    accounts: []
  };
  componentDidMount() {
    axios
      .get("/api/me", { withCredentials: true })
      .then(res => {
        const payload = res.data.data.data;
        const accountsids = payload.map(item => item.account_id);

        const userDetails = {
          email: payload[0].email,
          user_id: payload[0].user_id,
          accounts: accountsids
        };
        this.props.saveUserToContext(userDetails);
        const accountsDetails = payload.map(acc => {
          return {
            account_id: acc.account_id,
            account_name: acc.account_name,
            balance: acc.balance,
            type: acc.type
          };
        });
        const updated = Object.assign(userDetails, {
          accounts: accountsDetails
        });
        this.setState(updated);
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { accounts } = this.state;

    return (
      <TwoColumn>
        <FeedCard>
          <Accounts accounts={accounts} />
        </FeedCard>
        <FeedCard>
          <Transactions />
        </FeedCard>
      </TwoColumn>
    );
  }
}

export default Me;
