import React, { Component } from "react";
import axios from "axios";

class Accounts extends Component {
  state = {
    loading: true,
    data: ""
  };
  render() {
    const { accounts } = this.props;
    return (
      <div>
        <h1>My Accounts</h1>
        {accounts === null
          ? "Nothing to load"
          : accounts.map(item => {
              return (
                <div>
                  <strong>{item.account_id}</strong>
                  <p>
                    <span>{item.type}:&nbsp;</span>
                    <span>{item.balance}</span>
                  </p>
                </div>
              );
            })}
      </div>
    );
  }
}

export default Accounts;
