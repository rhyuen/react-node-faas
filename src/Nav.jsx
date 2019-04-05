import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logout from "./FormButton.jsx";

const StyledNav = styled.nav`
  background: white;
  position: fixed;
  display: flex;
  width: 100vw;
  height: 5vh;
  border-bottom: 1px solid ${props => props.theme.borderColour};
  justify-content: center;
  align-items: center;
  z-index: 5;
`;
const StyledNavContainer = styled.div`
  display: flex;
  align-items: center;
  width: 1024px;
  height: 100%;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  margin-right: 1vw;
  height: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;  
  border-bottom: 3px solid transparent;
  &:visited{
    color: black;
  }
  &:hover {
    border-bottom: 3px solid ${props => props.theme.primaryColour};  
`;

const Nav = ({ onLogout }) => {
  return (
    <StyledNav>
      <StyledNavContainer>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/me">Me</StyledLink>
        <Logout onClick={onLogout} type="button" value="Log Out" />
      </StyledNavContainer>
    </StyledNav>
  );
};

export default Nav;
