import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  font-size: 14px;
  color: ${props => props.theme.primaryColour};
  text-decoration: none;
  text-transform: uppercase;
  border-bottom: 2px solid transparent;
  font-weight: 600;

  &:hover{
    border-bottom-color: ${props => props.theme.primaryColour};
  }
`;

const ExportedStyledLink = props => {
  return <StyledLink {...props}>{props.children}</StyledLink>;
};

export default ExportedStyledLink;
