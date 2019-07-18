import React, { Component } from "react";
import styled from "styled-components";
import Cardless from "./Cardless.jsx";

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
          <Header>Recent Changes</Header>
          <section>
            It provides a web-based user interface to monitor and control smart
            home devices, a rules engine to automate them and an add-ons system
            to extend the gateway with support for a wide range of existing
            smart home devices.
          </section>
        </Cardless>
        <Cardless>
          <Header>Related Links</Header>
          <section>
            The idea of the Web of Things is to create a decentralized Internet
            of Things by giving things URLs on the web to make them linkable and
            discoverable, and defining a standard data model and APIs to make
            them interoperable. The Web of Things is intended as a unifying
            application layer for the Internet of Things (IoT), linking together
            multiple underlying IoT protocols using existing web technologies.
          </section>
        </Cardless>
      </Root>
    );
  }
}

export default AdColumn;
