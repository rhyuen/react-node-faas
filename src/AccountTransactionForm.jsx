import React, { Component } from "react";
import FeedCard from "./FeedCard.jsx";
import UpdatedInputButton from "./UpdatedInputButton.jsx";
import FormTextInput from "./FormTextInput.jsx";
import axios from "axios";

class AccountTransactionForm extends Component {
  state = {
    type: "deposit",
    amount: 0.0,
    transferTarget: "None"
  };

  handleFormChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  isFormValid = () => {
    const { amount } = this.state;
    const castedAmount = parseFloat(amount);
    console.log("It is of type: ");
    console.log(typeof castedAmount);
    if (castedAmount !== "number") {
      console.log("TODO: Disclaimer for Numbers only.");
      return false;
    } else if (castedAmount <= 0.0) {
      console.log("TODO: Disclaimer on Greater than 0 values.");
      return false;
    } else {
      return true;
    }
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { type, amount } = this.state;
    const url = "/api/createTransaction";
    axios
      .post(
        url,
        { origin: this.props.account_id, type, amount, transferTarget },
        { withCredentials: true }
      )
      .then(res => {
        console.log("Form Submit Success");
        console.log(res.data.data);
      })
      .catch(e => {
        console.log("Error on Form Submit");
        console.log(e);
      });
  };

  render() {
    const { type } = this.state;
    return (
      <FeedCard>
        <h1>New Transaction</h1>
        <form onSubmit={this.handleFormSubmit}>
          <input type="number" name="amount" placeholder="0.00" />
          <select onChange={this.handleFormChange} name="type">
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
            <option value="transfer">Transfer</option>
          </select>
          <div>
            {type === "transfer" ? (
              <input
                type="text"
                name="transferTarget"
                placeholder="000000-0000-0000-000000"
                onChange={this.handleFormChange}
              />
            ) : null}
          </div>
          <input type="submit" value="Execute" disabled={!this.isFormValid()} />
        </form>
      </FeedCard>
    );
  }
}

export default AccountTransactionForm;
