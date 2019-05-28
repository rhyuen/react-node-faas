import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import TwoColumn from "./TwoColumn.jsx";
import FeedCard from "./FeedCard.jsx";
import AccountTransactionForm from "./AccountTransactionForm.jsx";

class AccountSingle extends Component {
  state = {
    loading: true,
    data: []
  };
  componentDidMount() {
    const { account_id } = this.props.match.params;
    axios
      .get("/api/getSingleAccountDetails", {
        params: { account_id: account_id },
        withCredentials: true
      })
      .then(res => {
        this.setState({
          loading: false,
          data: res.data.data
        });
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {});
  }
  render() {
    const { data, loading } = this.state;
    return (
      <TwoColumn>
        <AccountTransactionForm account_id={this.props.match.params} />
        <FeedCard>
          <h1>Recent Account Transactions</h1>
          <section>
            {loading ? (
              <div>Loading details.</div>
            ) : data.length === 0 ? (
              <div>No recent transactions for this account.</div>
            ) : (
              data.map(item => {
                return (
                  <p>
                    <span>{item.type} || </span>
                    <span>{item.sender_id} || </span>
                    <span>{item.receiver_id} || </span>
                    <span>{item.amount} || </span>
                  </p>
                );
              })
            )}
          </section>
        </FeedCard>
      </TwoColumn>
    );
  }
}

export default AccountSingle;
