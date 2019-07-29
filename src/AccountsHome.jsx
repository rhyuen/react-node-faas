import React, { Component } from "react";
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
        this.setState({
          accounts: accounts
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleAccountCreationResult = result => {
    this.setState(ps => {
      return {
        ...ps,
        accounts: ps.accounts.concat(result)
      };
    });
  };

  render() {
    const { accounts } = this.state;
    return (
      <TwoColumn>
        <AccountCreationForm
          updateAccounts={this.handleAccountCreationResult}
        />
        <Accounts accounts={accounts} />
      </TwoColumn>
    );
  }
}

export default AccountsHome;
