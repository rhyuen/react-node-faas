import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Consumer } from "./Context.jsx";

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
  justify-content: space-between;
  align-items: center;
  width: 1024px;
  height: 100%;
`;
const NavSection = styled.div`
  display: flex;
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

const SelfArea = styled.section`
  display: flex;
  flex-direction: column;
  height: 5vh;
  max-height: 10vh;

  &:hover {
    height: 10vh;
  }
`;

const FormButton = styled.div`
  height: 5vh;
  background: white;
  width: 100%;
  text-align: left;
`;

const Logout = styled(FormButton)`
  display: none;
  color: black;
  background: lavender;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 3px solid transparent;
  height: 5vh;
  flex-direction: column;
  justify-content: center;

  ${SelfArea}:hover & {
    display: flex;
  }

  &:hover {
    background: white;
    border-bottom: 3px solid ${props => props.theme.primaryColour};
  }
`;

const Nav = ({ onLogout }) => {
  return (
    <StyledNav>
      <StyledNavContainer>
        <NavSection>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/me">Me</StyledLink>
          <StyledLink to="/account">Accounts</StyledLink>
        </NavSection>

        <NavSection>
          <Consumer>
            {context => (
              <SelfArea>
                <StyledLink to="/self">{context.email}</StyledLink>
                <Logout onClick={onLogout}>Sign Out</Logout>
              </SelfArea>
            )}
          </Consumer>
        </NavSection>
      </StyledNavContainer>
    </StyledNav>
  );
};

export default Nav;
