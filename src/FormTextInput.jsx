import React from "react";
import styled from "styled-components";

const TextInput = styled.input`
  border: 2px solid white;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  margin: 10px 0;
  width: 100%;
  &:focus {
    border-bottom: 2px solid ${props => props.theme.primaryColour};
    outline: none;
  }
`;

const ExportedTextInput = props => {
  return <TextInput {...props} />;
};

export default ExportedTextInput;
