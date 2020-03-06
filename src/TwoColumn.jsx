import React, { Component } from "react";
import styled from "styled-components";
import AdColumn from "./AdColumn.jsx";

const Root = styled.section`
  margin-top: 50px;
  display: grid;
  height: 100%;
  justify-items: stretch;
  grid-template-columns: repeat(12, 1fr);
`;

//Add media queries
const LeftColumn = styled.section`
  @media (max-width: 768px) {
    grid-column: 1 / span 12;
  }

  @media (max-width: 1023px) {
    grid-column: 1 / span 12;
  }

  @media (min-width: 1024px) {
    grid-column: 1 / span 8;
  }
`;
//Add media queries
const RightColumn = styled.section`
  display: none;
  @media (min-width: 1024px) {
    grid-column: 9 / span 4;
    display: block;
  }
`;
class TwoColumn extends Component {
  render() {
    return (
      <Root>
        <LeftColumn>{this.props.children}</LeftColumn>
        <RightColumn>
          <AdColumn />
        </RightColumn>
      </Root>
    );
  }
}

export default TwoColumn;
