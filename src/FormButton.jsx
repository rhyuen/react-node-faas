import React from "react";
import styled from "styled-components";

const StyledButton = styled.input`
  background: ${props => props.theme.primaryColour};
  border: 2px solid ${props => props.theme.primaryColour};
  border-radius: 2px;
  font-size: 16px;
  padding: 5px 10px;
  font-weight: bold;
  text-transform: uppercase;
  color: white;
  &:focus {
    outline: none;
  }
  &:hover {
    color: ${props => props.theme.primaryColour};
    background: white;
  }

  &:disabled {
    background: white;
    color: lightgrey;
    border-color: ${props => props.theme.borderColour};
  }
`;

const ExportedButton = props => {
  return <StyledButton {...props} />;
};

export default ExportedButton;
