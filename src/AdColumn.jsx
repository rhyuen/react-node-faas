import React, { Component } from "react";
import styled from "styled-components";
import Cardless from "./Cardless.jsx";

const Root = styled.section`
  display: flex;
  flex-direction: column;
`;

class AdColumn extends Component {
  render() {
    return (
      <Root>
        <Cardless>
          <h1>Arbitor</h1>
          <p>
            It provides a web-based user interface to monitor and control smart
            home devices, a rules engine to automate them and an add-ons system
            to extend the gateway with support for a wide range of existing
            smart home devices.
          </p>
        </Cardless>
        <Cardless>
          The idea of the Web of Things is to create a decentralized Internet of
          Things by giving things URLs on the web to make them linkable and
          discoverable, and defining a standard data model and APIs to make them
          interoperable. The Web of Things is intended as a unifying application
          layer for the Internet of Things (IoT), linking together multiple
          underlying IoT protocols using existing web technologies.
        </Cardless>
        <Cardless>
          Once you have connected the Pi to your wireless network, you should
          ensure that you laptop/tablet/smartphone is connected to the same
          Wi-Fi network and then navigate to http://gateway.local in your web
          browser.
        </Cardless>
        <Cardless>
          You will then be given the option to register a free subdomain to
          safely access your gateway over the Internet using a secure tunnelling
          service provided by Mozilla.
        </Cardless>
      </Root>
    );
  }
}

export default AdColumn;
