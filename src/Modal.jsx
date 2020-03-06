import React, { Component } from "react";
import styled from "styled-components";
import Card from "./Card.jsx";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

const ModalCard = styled(Card)`
  position: relative;
  border-radius: 2px;
`;

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
        <ModalCard>
          <ModalClose onClick={this.props.handleCloseButton}>
            &times;
          </ModalClose>
          <ModalContent>
            <div>{this.props.children}</div>

            <ModalConfirmation onClick={this.props.handleCloseButton}>
              Okay, I know.
            </ModalConfirmation>
          </ModalContent>
        </ModalCard>
      </ModalStyle>,
      this.el
    );
  }
}

export default Modal;

const ModalStyle = styled.section`
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  justify-content: center;
  align-items: center;
`;

const ModalConfirmation = styled.button`
  margin-top: 30px;
  border: 2px solid ${props => props.theme.primaryColour};
  border-radius: 2px;
  color: white;
  padding: 5px 10px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  background-color: ${props => props.theme.primaryColour};

  &:hover {
    background-color: white;
    color: ${props => props.theme.primaryColour};
  }
`;
const ModalClose = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 20px;
  background-color: transparent;
  border-radius: 50%;
  border: 1px solid transparent;
  color: black;
  font-weight: bolder;

  &:hover {
    background-color: ${props => props.theme.primaryColour};
    color: white;
  }
`;
