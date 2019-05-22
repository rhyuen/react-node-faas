import React from "react";
import styled from "styled-components";

const InputButton = styled.input`
  border: 2px solid ${props => props.theme.primaryColour};
  background: ${props => props.theme.primaryColour};
  text-transform: uppercase;
  color: white;

  &:hover {
    background: white;
    color: ${props => props.theme.primaryColour};
  }
`;

const ExportedInputButton = props => {
  return <InputButton {...props} />;
};

export default ExportedInputButton;
