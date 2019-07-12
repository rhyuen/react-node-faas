import React, { Component } from "react";
import styled from "styled-components";
import FeedCard from "./FeedCard.jsx";
import UpdatedInputButton from "./UpdatedInputButton.jsx";
import FormTextInput from "./FormTextInput.jsx";
import WarningBox from "./WarningBox.jsx";
import axios from "axios";

const FormControl = styled.div`
  display: flex;
  justify-content: space-between;
`;
class AccountCreationForm extends Component {
  state = {
    accountname: "",
    accounttype: "savings",
    invalidAccountName: false
  };

  handleFormChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleNewAccountSubmit = e => {
    e.preventDefault();
    const { accountname, accounttype } = this.state;

    if (accountname === "") {
      //TODO: show, you must have an account name;
      console.log(`yes, the account name is invalid: ${accountname}`);
      return;
    }

    console.log(accountname);
    console.log(accounttype);
    axios
      .post(
        "/api/createAccount",
        {
          accountname: accountname,
          accounttype: accounttype
        },
        {
          withCredentials: true
        }
      )
      .then(res => {
        console.log(res.data);

        //TODO: Might want to do a CB to update the AccountsHome.jsx root componentn
      })
      .catch(e => {
        console.log(e);
        console.log("something went wrong with account creation.");
      })
      .finally(() => {
        this.setState({
          accountname: "",
          accounttype: "savings"
        });
      });
  };
  render() {
    const { accounttype, accountname, invalidAccountName } = this.state;

    return (
      <FeedCard>
        <h1>Add New Account</h1>
        <form onSubmit={this.handleNewAccountSubmit}>
          <span>
            <FormTextInput
              type="text"
              name="accountname"
              onChange={this.handleFormChange}
              value={accountname}
              placeholder="New Account Name"
            />
          </span>
          <FormControl>
            <section>
              <select
                name="accounttype"
                value={accounttype}
                onChange={this.handleFormChange}
              >
                <option value="savings">Savings</option>
                <option value="chequing">Chequing</option>
              </select>
              {invalidAccountName ? null : (
                <WarningBox>Account Name cannot be empty.</WarningBox>
              )}
            </section>
            <section>
              <UpdatedInputButton type="submit" value="Create" />
            </section>
          </FormControl>
        </form>
      </FeedCard>
    );
  }
}

export default AccountCreationForm;
