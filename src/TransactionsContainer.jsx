import React, { Component } from "react";
import styled from "styled-components";

const TxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20px, 1fr));
  padding: 10px
  border-radius: 2px;
  &:hover {
    background: ${props => props.theme.borderColour};
    border-radius: 2px;
  }
  &:first-child {
    margin-top: 20px;
  }
`;
const TxCell = styled.span`
  font-size: 12px;
`;
const TxCellSmall = styled.span`
  text-transform: uppercase;
  font-size: 16px;
  font-weight: bold;
`;
const TxType = styled(TxCellSmall)`
  text-align: left;
  overflow-x: hidden;
`;
const TxTotal = styled(TxCellSmall)`
  padding-left: 20px;
`;

const TransactionsContainer = ({ type, sender, receiver, amount, owner }) => {
  let revealedSender = sender;
  let revealedReceiver = receiver;

  // if (!owner) {
  //   if (sender === "00000000-0000-0000-0000-000000000002") {
  //     revealedSender = "CASH DEPOSIT";
  //   }

  //   if (receiver === "00000000-0000-0000-0000-000000000001") {
  //     revealedReceiver = "CASH WITHDRAWL";
  //   }
  // }

  switch (type) {
    case "deposit":
      if (sender === "00000000-0000-0000-0000-000000000002") {
        revealedSender = "CASH DEPOSIT";
      }

      if (receiver === owner) {
        revealedReceiver = "THIS ACCOUNT";
      }
      break;
    case "withdrawl":
      if (receiver === "00000000-0000-0000-0000-000000000001") {
        revealedReceiver = "CASH WITHDRAWL";
      }

      if (sender === owner) {
        revealedSender = "THIS ACCOUNT";
      }

      break;
    case "transfer":
      if (receiver === owner) {
        revealedReceiver = "THIS ACCOUNT";
      } else if (sender === owner) {
        revealedSender = "THIS ACCOUNT";
      }
      console.log("transfer case");

      break;
    default:
      console.log("Account numbers because default case.");
  }

  return (
    <TxContainer>
      <TxType>{type}</TxType>
      <TxCell>{revealedSender}</TxCell>
      <TxCell>{revealedReceiver}</TxCell>
      <TxTotal>{amount}</TxTotal>
    </TxContainer>
  );
};

export default TransactionsContainer;
