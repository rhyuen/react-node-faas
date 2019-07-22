import React, { Component } from "react";
import styled from "styled-components";
import EmptyPlaceholder from "./EmptyPlaceholder.jsx";
import StyledOptionLink from "./StyledOptionLink.jsx";
import FeedCard from "./FeedCard.jsx";

const AccountItemRoot = styled.div`
  padding: 5px;
  display: flex;
  justify-content: space-between;

  &:hover {
    background-color: ${props => props.theme.borderColour};
    border-radius: 3px;
  }
`;

const Subheading = styled.h2`
  font-weight: 400;
  font-size: 12px;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.5);
  margin: 0;
`;

const Type = styled.span`
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.3);
  font-size: 30px;
  font-weight: bolder;
`;
const Balance = styled(Type)`
  color: black;
  margin-left: 20px;
`;
class Accounts extends Component {
  render() {
    const { accounts } = this.props;
    return (
      <FeedCard>
        <h1>My Accounts</h1>
        {accounts === null ? (
          <EmptyPlaceholder>No accounts to show.</EmptyPlaceholder>
        ) : (
          accounts.map(item => {
            return (
              <AccountItemRoot>
                <section>
                  <StyledOptionLink to={`/account/${item.account_id}`}>
                    {item.account_name}
                  </StyledOptionLink>
                  <br />
                  <Subheading>{item.account_id}</Subheading>
                </section>

                <section>
                  <Type>{item.type}</Type>
                  <Balance>{item.balance}</Balance>
                </section>
              </AccountItemRoot>
            );
          })
        )}
      </FeedCard>
    );
  }
}

export default Accounts;
