import React from "react";
import styled from "styled-components";

const StyledButton = styled.input`
  background: ${props => props.theme.primaryColour};
  border: 2px solid ${props => props.theme.primaryColour};
  padding: 10px 20px;
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
`;

const ExportedButton = props => {
  return <StyledButton {...props} />;
};

export default ExportedButton;
