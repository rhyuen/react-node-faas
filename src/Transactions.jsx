import React, { Component } from "react";
import axios from "axios";

class Transactions extends Component {
  state = {
    data: ""
  };
  componentDidMount() {
    axios
      .get("/api/transactions", { useCredentials: true })
      .then(res => {
        console.log(res.data);
        this.setSTate({
          data: res.data.data.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    return (
      <div>
        <h1>Recent Transactions</h1>
      </div>
    );
  }
}

export default Transactions;
