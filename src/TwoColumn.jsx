import React, { Component } from "react";
import styled from "styled-components";

const Root = styled.section`
  display: grid;
  height: 100%;
  justify-items: stretch;
  grid-template-columns: repeat(12, 1fr);
`;
const LeftColumn = styled.section`
  background: palevioletred;
  grid-column: 1 / span 8;
`;
const RightColumn = styled.section`
  background: papayawhip;
  grid-column: 9 / span 4;
`;
class TwoColumn extends Component {
  render() {
    return (
      <Root>
        <LeftColumn>{this.props.children}</LeftColumn>
        <RightColumn>
          Ads and Stuff as well as full width Images. Ads and Stuff as well as
          full width Images.Ads and Stuff as well as full width Images.Ads and
          Stuff as well as full width Images. Ads and Stuff as well as full
          width Images.Ads and Stuff as well as full width Images.Ads and Stuff
          as well as full width Images.Ads and Stuff as well as full width
          Images.
        </RightColumn>
      </Root>
    );
  }
}

export default TwoColumn;
