import React, { Component } from "react";
import styled from "styled-components";
import FeedCard from "./FeedCard.jsx";
import UpdatedInputButton from "./UpdatedInputButton.jsx";
import WarningBox from "./WarningBox.jsx";
import FormTextInput from "./FormTextInput.jsx";
import axios from "axios";

const FormControl = styled.div`
  display: flex;
  justify-content: space-between;
`;
class AccountTransactionForm extends Component {
  state = {
    type: "deposit",
    amount: 0.0,
    transferTarget: "None",
    isBadInputWarningVisible: false
  };

  handleFormChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  isFormValid = () => {
    const { amount } = this.state;
    const castedAmount = parseInt(amount);
    console.log("It is of type: %s", typeof castedAmount);
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
    const { type, amount, transferTarget } = this.state;

    if (amount <= 0) {
      return this.setState({
        amount: 0,
        isBadInputWarningVisible: true
      });
    }

    const url = "/api/createTransaction";
    axios
      .post(
        url,
        { origin: this.props.account_id, type, amount, transferTarget },
        { withCredentials: true }
      )
      .then(res => {
        console.log(res.data.data);
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        console.log("Account Transaction was dispatched.");
        this.setState({
          amount: 0.0
        });
      });
  };

  render() {
    const {
      type,
      amount,
      transferTarget,
      isBadInputWarningVisible
    } = this.state;
    return (
      <FeedCard>
        <h1>New Transaction</h1>
        <form onSubmit={this.handleFormSubmit}>
          <FormTextInput
            type="number"
            name="amount"
            value={amount}
            onChange={this.handleFormChange}
            placeholder={0.0}
          />
          <div>
            {type === "transfer" ? (
              <FormTextInput
                type="text"
                name="transferTarget"
                value={transferTarget}
                placeholder="000000-0000-0000-000000"
                onChange={this.handleFormChange}
              />
            ) : null}
          </div>
          <FormControl>
            <section>
              <select onChange={this.handleFormChange} name="type">
                <option value="deposit">Deposit</option>
                <option value="withdrawl">Withdraw</option>
                <option value="transfer">Transfer</option>
              </select>
              {isBadInputWarningVisible ? (
                <WarningBox>
                  Amounts for Transaction need to be greater than 0.00.
                </WarningBox>
              ) : null}
            </section>
            <UpdatedInputButton
              type="submit"
              value="Execute"
              disabled={!this.isFormValid}
            />
          </FormControl>
        </form>
      </FeedCard>
    );
  }
}

export default AccountTransactionForm;
