import React, { Component } from "react";
import axios from "axios";
import TwoColumn from "./TwoColumn.jsx";
import TransactionsHeader from "./TransactionsHeader.jsx";
import TransactionsContainer from "./TransactionsContainer.jsx";
import FeedCard from "./FeedCard.jsx";
import AccountTransactionForm from "./AccountTransactionForm.jsx";
import LoadingPlaceholder from "./LoadingPlaceholder.jsx";
import EmptyPlaceholder from "./EmptyPlaceholder.jsx";
import AccountSingleGeneralDetails from "./AccountSingleGeneralDetails.jsx";

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
    const { account_id } = this.props.match.params;
    const { data, loading } = this.state;
    return (
      <TwoColumn>
        <AccountSingleGeneralDetails account_id={account_id} />
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
