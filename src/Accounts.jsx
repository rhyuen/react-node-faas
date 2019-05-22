import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Subheading = styled.h2`
  font-weight: 400;
  font-size: 14px;
  margin: 0;
`;
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
                    <Link to={`/account/${item.account_id}`}>
                      {item.account_name}
                    </Link>
                    <br />
                    <Subheading>{item.account_id}</Subheading>
                  </div>

                  <p>
                    <span>{item.type}:&nbsp;</span>
                    <span>
                      <strong>{item.balance}</strong>
                    </span>
                  </p>
                </div>
              );
            })}
      </div>
    );
  }
}

export default Accounts;
