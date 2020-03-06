import React, { Component } from "react";
import TransactionsHeader from "./TransactionsHeader.jsx";
import TransactionsContainerGeneral from "./TransactionsContainerGeneral.jsx";
import axios from "axios";
import LoadingPlaceholder from "./LoadingPlaceholder.jsx";
import EmptyPlaceholder from "./EmptyPlaceholder.jsx";
import FeedCard from "./FeedCard.jsx";

class Transactions extends Component {
  state = {
    loading: true,
    error: false,
    data: []
  };

  componentDidMount() {
    axios
      .get("/api/transactions", { withCredentials: true })
      .then(res => {
        this.setState(ps => {
          return {
            ...ps,
            loading: false,
            data: res.data.data
          };
        });
      })
      .catch(e => {
        console.log("Error with fetching transactions data.");
        console.log(e);
        this.setState(ps => {
          return {
            ...ps,
            loading: false,
            error: true
          };
        });
      });
  }

  render() {
    let { loading, data } = this.state;
    if (loading) {
      return (
        <LoadingPlaceholder message="Waiting for your transactions to load..." />
      );
    } else {
      return (
        <FeedCard>
          <h1>Your Recent Transactions</h1>
          <TransactionsHeader />
          <section>
            {data.length === 0 ? (
              <EmptyPlaceholder>
                You haven't made any recent transactions.
              </EmptyPlaceholder>
            ) : (
              data.map(item => {
                return (
                  <TransactionsContainerGeneral
                    transaction={item}
                    accounts={this.props.accounts}
                  />
                );
              })
            )}
          </section>
        </FeedCard>
      );
    }
  }
}

export default Transactions;
