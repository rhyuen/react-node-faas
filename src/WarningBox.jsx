import React from "react";
import styled from "styled-components";

const Container = styled.span`
  font-size: 12px;
  border-bottom: 3px solid palevioletred;
  margin: 10px;
  font-weight: 600;
`;

const StyledWarningBox = props => {
  return <Container {...props}>{props.children}</Container>;
};

export default StyledWarningBox;
