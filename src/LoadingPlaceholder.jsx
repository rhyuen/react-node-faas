import React from "react";
import styled from "styled-components";

const PlaceHolder = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding: 40px 0;
`;
const LoadingPlaceholder = ({ message = "Loading guise..." }) => {
  return <PlaceHolder>{message}</PlaceHolder>;
};

export default LoadingPlaceholder;
