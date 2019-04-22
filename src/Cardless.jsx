import React, { Component } from "react";
import styled from "styled-components";

const Cardless = styled.div`
  background: inherit;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  margin: 10px 20px;
  padding-bottom: 40px;
`;

const Root = ({ children }) => {
  return <Cardless>{children}</Cardless>;
};

export default Root;
