import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledOptionLink = styled(Link)`
  color: ${props => props.theme.primaryColour};
  font-weight: 600;
  text-decoration: none;
  width: fit-content;
  padding-bottom: 1px;
  border-bottom: 3px solid transparent;

  &:hover {
    border-bottom: 3px solid ${props => props.theme.primaryColour};
  }
`;

const ExportedStyledOptionLink = props => {
  return <StyledOptionLink {...props}>{props.children}</StyledOptionLink>;
};

export default StyledOptionLink;
