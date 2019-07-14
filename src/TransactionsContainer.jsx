import React, { Component } from "react";
import styled from "styled-components";

const TxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20px, 1fr));
  padding: 10px 0;
  &:hover {
    background: ${props => props.theme.borderColour};
    border-radius: 2px;
  }
  &:first-child {
    padding-top: 30px;
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

const TransactionsContainer = ({ type, sender, receiver, amount }) => {
  return (
    <TxContainer>
      <TxType>{type}</TxType>
      <TxCell>{sender}</TxCell>
      <TxCell>{receiver}</TxCell>
      <TxTotal>{amount}</TxTotal>
    </TxContainer>
  );
};

export default TransactionsContainer;
