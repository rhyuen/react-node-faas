import React, { Component } from "react";
import FeedCard from "./FeedCard.jsx";
import AccountCreationForm from "./AccountCreationForm.jsx";
import TwoColumn from "./TwoColumn.jsx";
import Accounts from "./Accounts.jsx";
import axios from "axios";

class AccountsHome extends Component {
  state = {
    accounts: []
  };
  componentDidMount() {
    axios
      .get("/api/accounts", { useCredentials: true })
      .then(res => {
        const accounts = res.data.data.data;
        console.log(accounts);
        this.setState({
          accounts: accounts
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { accounts } = this.state;
    return (
      <TwoColumn>
        <AccountCreationForm />
        <FeedCard>
          <Accounts accounts={accounts} />
        </FeedCard>
      </TwoColumn>
    );
  }
}

export default AccountsHome;
