import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logout from "./FormButton.jsx";
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

const Nav = ({ onLogout }) => {
  return (
    <StyledNav>
      <StyledNavContainer>
        <NavSection>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/me">Me</StyledLink>
        </NavSection>
        <NavSection>
          <Consumer>
            {context => (
              <div>
                <span>{context.email}</span>
                <br />
                <span>{context.user_id}</span>
              </div>
            )}
          </Consumer>
          <Logout onClick={onLogout} type="button" value="Log Out" />
        </NavSection>
      </StyledNavContainer>
    </StyledNav>
  );
};

export default Nav;
