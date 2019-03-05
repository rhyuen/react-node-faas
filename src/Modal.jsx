import React, { Component } from "react";
import styled from "styled-components";
import Card from "./Card.jsx";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

class Modal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return createPortal(
      <ModalStyle>
        <Card>{this.props.children}</Card>
      </ModalStyle>,
      this.el
    );
  }
}

export default Modal;

const ModalStyle = styled.section`
  position: fixed;
  z-index: 2;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
