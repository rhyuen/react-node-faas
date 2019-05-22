import React, { Component } from "react";
import FeedCard from "./FeedCard.jsx";
import UpdatedInputButton from "./UpdatedInputButton.jsx";
import FormTextInput from "./FormTextInput.jsx";
import axios from "axios";

class AccountCreationForm extends Component {
  state = {
    accountname: "",
    accounttype: "savings"
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
        console.log("finally it clears.");
        this.setState({
          accountname: "",
          accounttype: "savings"
        });
      });
  };
  render() {
    const { accounttype, accountname } = this.state;

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
          <span>
            <select
              name="accounttype"
              value={accounttype}
              onChange={this.handleFormChange}
            >
              <option value="savings">Savings</option>
              <option value="chequing">Chequing</option>
            </select>
            <UpdatedInputButton type="submit" value="Create" />
          </span>
        </form>
      </FeedCard>
    );
  }
}

export default AccountCreationForm;
