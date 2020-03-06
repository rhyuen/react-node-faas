import React from "react";
import styled from "styled-components";

const StyledHeader = styled.h1`  
  color: ${props => props.theme.primaryColour};  
  text-transform: uppercase;  
  font-weight: 600;  
`;

const ExportedStyledHeader = props => {
    return <StyledHeader>{props.children}</StyledHeader>;
};

export default ExportedStyledHeader;
