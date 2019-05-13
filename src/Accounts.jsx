import React, { Component } from "react";

class Accounts extends Component {
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
                  <div>
                    <p>
                      <strong>{item.account_name}</strong>
                    </p>
                    <p>{item.account_id}</p>
                  </div>

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
