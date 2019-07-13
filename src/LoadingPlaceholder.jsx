import React from "react";
import styled from "styled-components";

const LoadingPlaceholder = ({ message = "Loading guise..." }) => {
  return <div>{message}</div>;
};

export default LoadingPlaceholder;
