import React, { Component } from "react";
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
        console.log("account single");
        console.log(res.data);
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
        <AccountTransactionForm account_id={this.props.match.params} />

        <FeedCard>
          <h1>Recent Account Transactions</h1>
          <section>
            {loading ? (
              <div>Loading details...</div>
            ) : data.length === 0 ? (
              <div>No recent transactions for this account.</div>
            ) : (
              data.map(item => {
                return (
                  <TxContainer>
                    <TxType>{item.type}</TxType>
                    <TxCell>{item.sender_id}</TxCell>
                    <TxCell>{item.receiver_id}</TxCell>
                    <TxTotal>{item.amount}</TxTotal>
                  </TxContainer>
                );
              })
            )}
          </section>
        </FeedCard>
      </TwoColumn>
    );
  }
}

const TxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20px, 1fr));
  padding: 10px 0;
`;
const TxCell = styled.span`
  font-size: 12px;
`;
const TxCellSmall = styled.span`
  text-transform: uppercase;
  font-size: 16px;
  font-weight: bold;
`;
const TxType = styled(TxCellSmall)`
  text-align: left;
  overflow-x: hidden;
`;
const TxTotal = styled(TxCellSmall)`
  padding-left: 20px;
`;

export default AccountSingle;
