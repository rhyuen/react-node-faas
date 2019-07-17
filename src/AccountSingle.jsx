import React, { Component } from "react";
import axios from "axios";
import TwoColumn from "./TwoColumn.jsx";
import TransactionsHeader from "./TransactionsHeader.jsx";
import TransactionsContainer from "./TransactionsContainer.jsx";
import FeedCard from "./FeedCard.jsx";
import AccountTransactionForm from "./AccountTransactionForm.jsx";
import LoadingPlaceholder from "./LoadingPlaceholder.jsx";
import EmptyPlaceholder from "./EmptyPlaceholder.jsx";

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
        this.setState({
          loading: false
        });
      })
      .finally(() => {});
  }
  render() {
    const { data, loading } = this.state;
    return (
      <TwoColumn>
        <FeedCard>
          <h1>About this account: ___</h1>
          <section>
            <p>Current Balance: </p>
            <p>Account Type: </p>
            <p>Created On: </p>
            <p>Last Modified: </p>
            <strong>
              JL10: Fix the query so common information is in one field and not
              duplicated.
            </strong>
          </section>
        </FeedCard>
        <AccountTransactionForm
          account_id={this.props.match.params.account_id}
        />

        <FeedCard>
          <h1>Recent Account Transactions</h1>
          <section>
            <TransactionsHeader />
            {loading ? (
              <LoadingPlaceholder message="Loading Details..." />
            ) : data.length === 0 ? (
              <EmptyPlaceholder>
                No recent transactions for this account.
              </EmptyPlaceholder>
            ) : (
              data.map(item => {
                return (
                  <TransactionsContainer
                    type={item.type}
                    sender={item.sender_id}
                    receiver={item.receiver_id}
                    amount={item.amount}
                  />
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
