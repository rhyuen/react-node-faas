import React from "react";
import styled from "styled-components";

const StyledText = styled.p`
  font-size: 14px;
  margin: 10px 0;
`;

const ExportedStyledText = props => {
  return <StyledText>{props.children}</StyledText>;
};

export default ExportedStyledText;
