import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  font-size: 14px;
  color: ${props => props.theme.primaryColour};
  font-weight: 600;
`;

const ExportedStyledLink = props => {
  return <StyledLink {...props}>{props.children}</StyledLink>;
};

export default ExportedStyledLink;
