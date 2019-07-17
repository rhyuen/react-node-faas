import React from "react";
import styled from "styled-components";

const RootPlaceHolder = styled.div`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  text-decoration: underline;
  padding: 40px 0;
`;
const EmptyPlaceholder = ({ children }) => {
  return <RootPlaceHolder>{children}</RootPlaceHolder>;
};

export default EmptyPlaceholder;
