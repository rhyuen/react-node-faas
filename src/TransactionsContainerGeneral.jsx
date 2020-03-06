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

const TransactionsContainerGeneral = ({ transaction, accounts }) => {
  const { created_at, type, sender_id, receiver_id, amount } = transaction;
  let revealedSender = sender_id;
  let revealedReceiver = receiver_id;

  const senderInAccounts = accounts.filter(
    acct => acct.account_id === sender_id
  );
  if (senderInAccounts.length === 1) {
    revealedSender = senderInAccounts[0].account_name;
  }

  const receiverInAccounts = accounts.filter(
    acct => acct.account_id === receiver_id
  );
  if (receiverInAccounts.length === 1) {
    revealedReceiver = receiverInAccounts[0].account_name;
  }

  switch (type) {
    case "deposit":
      if (sender_id === "00000000-0000-0000-0000-000000000002") {
        revealedSender = "CASH DEPOSIT";
      }

      break;
    case "withdrawl":
      if (receiver_id === "00000000-0000-0000-0000-000000000001") {
        revealedReceiver = "CASH WITHDRAWL";
      }

      break;
    default:
      console.log("Account numbers because default case.");
  }

  return (
    <TxContainer>
      <TxType>{created_at.split("T")[0].slice(2)}</TxType>
      <TxType>{type}</TxType>
      <TxCell title={sender_id}>{revealedSender}</TxCell>
      <TxCell title={receiver_id}>{revealedReceiver}</TxCell>
      <TxTotal>{amount}</TxTotal>
    </TxContainer>
  );
};

export default TransactionsContainerGeneral;
