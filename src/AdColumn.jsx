import React, { Component } from "react";
import styled from "styled-components";
import Cardless from "./Cardless.jsx";
import AdRelatedLinks from "./AdReleatedLinks.jsx";

const Root = styled.section`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  font-size: 18px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 10px;
`;

class AdColumn extends Component {
  render() {
    return (
      <Root>
        <Cardless>
          <Header>About OLIA Bank</Header>
          <section>
            Just a banking application that I made up.   'OLIA Bank' stands for "Oh look, it's another" bank.
          </section>
        </Cardless>
        <AdRelatedLinks />
      </Root>
    );
  }
}

export default AdColumn;
