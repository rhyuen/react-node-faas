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
const NavLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.primaryColour};
  font-weight: bold;
  text-transform: uppercase;
  margin-right: 1vw;
  height: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;  
  border-bottom: 3px solid transparent;
  
  &:hover {
    border-bottom: 3px solid ${props => props.theme.primaryColour};  
`;

const ProfileLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 16px;
  color: ${props => props.theme.primaryColour};
  text-transform: uppercase;
  text-decoration: none;
  font-weight: bold;
`;

const FormButton = styled.div`
  height: 5vh;
  background: white;
  width: 100%;
  text-align: left;
`;

const Logout = styled(FormButton)`
  color: palevioletred;
  font-weight: bold;
  text-transform: uppercase;
  border-bottom: 1px solid ${props => props.theme.borderColour};  
  height: 5vh;
  display: flex;
  flex-direction: column;  
  padding: 0 10px;  
  justify-content: center;
  cursor: pointer;
  
  &:hover{
    border-bottom: 2px solid palevioletred;
  }
`;

const Nav = ({ onLogout }) => {
  return (
    <StyledNav>
      <StyledNavContainer>
        <NavSection>
          <NavLink to="/">OLIA</NavLink>
          <NavLink to="/me">Me</NavLink>
          <NavLink to="/account">Accounts</NavLink>
        </NavSection>

        <NavSection>
          <Consumer>
            {context => <ProfileLink to="/self">{context.email}</ProfileLink>}
          </Consumer>
          <Logout onClick={onLogout}>Sign Out</Logout>
        </NavSection>
      </StyledNavContainer>
    </StyledNav>
  );
};

export default Nav;
