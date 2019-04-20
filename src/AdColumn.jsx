import React, { Component } from "react";
import styled from "styled-components";

const Root = styled.section`
  display: grid;
  height: 100%;
  justify-items: stretch;
  grid-template-columns: repeat(12, 1fr);
`;

class AdColumn extends Component {
  render() {
    return <Root>AdColumn</Root>;
  }
}

export default AdColumn;
