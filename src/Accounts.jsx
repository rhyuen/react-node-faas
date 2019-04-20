import React, { Component } from "react";
import axios from "axios";

class Accounts extends Component {
  state = {
    data: ""
  };
  componentDidMount() {
    axios
      .get("/api/accounts", { useCredentials: true })
      .then(res => {
        console.log(res.data);
        //console.log(res.data.data.data);
        this.setState({ data: res.data.data.data });
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    return (
      <div>
        <h1>My Accounts</h1>
        {this.state.data === ""
          ? null
          : this.state.data.map(item => {
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
