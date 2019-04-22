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
        this.setState({
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
        <h1>Recent Transactions!</h1>

        <p>
          The goal of the Web of Things is to extend the web of pages into a web
          of things by giving connected devices URLs on the World Wide Web. This
          will allow the web to be used as a unifying application layer for a
          decentralized Internet of Things. Whilst web technologies are already
          in widespread use on the Internet of Things, this is currently done
          with mostly proprietary data formats and APIs which require per-vendor
          integrations to make devices interoperable. In order to promote ad-hoc
          interoperability on the Internet of Things a shared vocabulary and
          common API is needed. In this document we propose a common data model
          and API for the Web of Things.
        </p>
      </div>
    );
  }
}

export default Transactions;
