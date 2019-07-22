import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import FeedCard from "./FeedCard.jsx";
import LoadingPlaceholder from "./LoadingPlaceholder.jsx";

class AccountSingleGeneralDetails extends Component {
  state = {
    loading: true,
    data: []
  };
  componentDidMount() {
    const { account_id } = this.props;
    axios
      .get("/api/getSingleAccountGeneralDetails", {
        params: { account_id: account_id },
        withCredentials: true
      })
      .then(res => {
        console.log(this.props.account_id);
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
      <FeedCard>
        {loading ? (
          <LoadingPlaceholder>
            Loading this account's details...
          </LoadingPlaceholder>
        ) : data.length === 0 ? (
          <div>
            We cannot seem to get the data for this account at this time.
          </div>
        ) : (
          <div>
            <h1>
              About your account: <i>{data[0].account_name}</i>
              <br />
              Account #: <i>{data[0].account_id}</i>
            </h1>
            <AccountDetailsTable>
              <p>
                Current Balance: <strong>{data[0].balance}</strong>
              </p>
              <p>
                Account Type: <strong>{data[0].type.toUpperCase()}</strong>
              </p>
              <p>
                Created On: <strong>{data[0].created_at.split("T")[0]}</strong>
              </p>
              <p>
                Last Modified:{" "}
                <strong>{data[0].last_modified.split("T")[0]}</strong>
              </p>
            </AccountDetailsTable>
          </div>
        )}
      </FeedCard>
    );
  }
}

const AccountDetailsTable = styled.section`
  display: grid;
  grid-template-columns: repeat(2, minmax(auto, 200px));
  grid-template-rows: repeat(2, minmax(auto, 30px));
`;

export default AccountSingleGeneralDetails;
