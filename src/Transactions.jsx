import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";

const StyledHeader = styled.section`
  display: flex;
  justify-content: space-between;
`;

class Transactions extends Component {
  state = {
    loading: true,
    error: false,
    data: ""
  };

  componentDidMount() {
    axios
      .get("/api/transactions", { useCredentials: true })
      .then(res => {
        console.log(res.data.data);
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
        <div>
          <h1>Loading Transactions</h1>
          <p>Filler text goes here.</p>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Your Recent Transactions</h1>
          <StyledHeader>
            <span>Type</span>
            <span>Sender</span>
            <span>Receiver</span>
            <span>Amount</span>
          </StyledHeader>
          <section>
            {data.map(item => {
              return (
                <p>
                  <span>{item.type} || </span>
                  <span>{item.sender_id} || </span>
                  <span>{item.receiver_id} || </span>
                  <span>{item.amount} || </span>
                </p>
              );
            })}
          </section>
        </div>
      );
    }
  }
}

export default Transactions;
