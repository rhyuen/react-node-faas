import React, { Component } from "react";
import styled from "styled-components";
import FeedCard from "./FeedCard.jsx";
import UpdatedInputButton from "./UpdatedInputButton.jsx";
import FormTextInput from "./FormTextInput.jsx";
import WarningBox from "./WarningBox.jsx";
import Modal from "./Modal.jsx";
import axios from "axios";

const FormControl = styled.div`
  display: flex;
  justify-content: space-between;
`;
class AccountCreationForm extends Component {
  state = {
    accountname: "",
    accounttype: "savings",
    invalidAccountName: false,
    isNewAccountModalVisible: false,
    modalText: ""
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
        this.props.updateAccounts(res.data.data[0]);
        this.setState({
          accountname: "",
          isNewAccountModalVisible: true,
          modalText: `Your new account '${
            res.data.data[0].account_name
          }' has been created.`
        });
      })
      .catch(e => {
        console.log(e);
        console.log("something went wrong with account creation.");
        this.setState({
          accountname: "",
          isNewAccountModalVisible: true,
          modalText: "Something has gone with the creation of your new account."
        });
      });
  };

  handleModalClose = e => {
    this.setState({
      isNewAccountModalVisible: false,
      modalText: ""
    });
  };
  render() {
    const {
      accounttype,
      accountname,
      invalidAccountName,
      isNewAccountModalVisible,
      modalText
    } = this.state;

    return (
      <FeedCard>
        {isNewAccountModalVisible ? (
          <Modal handleCloseButton={this.handleModalClose}>{modalText}</Modal>
        ) : null}
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

// const ModalContainer = styled.div`
//   position: relative;
// `;
// const ModalText = styled.div`
//   padding-top: 20px;
// `;

// const CloseButton = styled.button`
//   position: absolute;
//   top: 5px;
//   right: 5px;
//   font-weight: bolder;
//   border: none;
//   background: transparent;
//   color: ${props => props.theme.primaryColour};
// `;

// const ModalButton = styled.button`
//   color: white;
//   text-transform: uppercase;
//   font-size: 16px;
//   background: ${props => props.theme.primaryColour};
//   padding: 10px;
//   border: 1px solid transparent;
//   border-radius: 2px;
// `;

export default AccountCreationForm;
