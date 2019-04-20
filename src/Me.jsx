import React, { Component } from "react";
import axios from "axios";
import TwoColumn from "./TwoColumn.jsx";
import Accounts from "./Accounts.jsx";
import Transactions from "./Transactions.jsx";

class Me extends Component {
  state = {
    data: ""
  };
  componentDidMount() {
    axios
      .get("/api/user", { useCredentials: true })
      .then(res => {
        console.log(res.data.data);
        const payload = res.data.data;

        this.setState({
          data: payload[0]
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { onLogout } = this.props;
    const { email, password, user_id } = this.state.data;
    return (
      <TwoColumn>
        <div>
          <h1>"You're now logged in."</h1>
          <p>email:{email}</p>
          <p>password:{password}</p>
          <p>user_id:{user_id}</p>
        </div>
        <Accounts />
        <Transactions />
      </TwoColumn>
    );
  }
}

export default Me;
