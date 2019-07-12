import React from "react";
import styled from "styled-components";

const InputButton = styled.input`
  border: 2px solid ${props => props.theme.primaryColour};
  background: ${props => props.theme.primaryColour};
  padding: 5px 10px;
  border-radius: 2px;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  color: white;

  &:hover {
    background: white;
    color: ${props => props.theme.primaryColour};
  }
  &:focus {
    outline: none;
  }
`;

const ExportedInputButton = props => {
  return <InputButton {...props} />;
};

export default ExportedInputButton;
