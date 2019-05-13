import React, { Component } from "react";
import Card from "./Card.jsx";
import { Link } from "react-router-dom";
import axios from "axios";

class AccountsHome extends Component {
  state = {};
  componentDidMount() {
    axios.get("/api/accounts", { useCredentials: true }).then(res => {
      const accounts = res.data.data;
    });
  }
  render() {
    const { accounts } = this.state;
    return (
      <Card>
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
      </Card>
    );
  }
}

export default Accounts;
