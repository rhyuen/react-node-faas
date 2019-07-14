import React, { Component } from "react";
import styled from "styled-components";

const TxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20px, 1fr));
  padding: 10px 0;
  border-bottom: 1px solid ${props => props.theme.borderColour};
`;

const Cell = styled.span`
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
`;

const TotalCell = styled(Cell)`
  padding-left: 20px;
`;

const TransactionsHeader = props => {
  return (
    <TxContainer>
      <Cell>Type</Cell>
      <Cell>Sender</Cell>
      <Cell>Receiver</Cell>
      <TotalCell>Amount</TotalCell>
    </TxContainer>
  );
};

export default TransactionsHeader;
