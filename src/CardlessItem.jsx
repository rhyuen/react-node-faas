import React, { Component } from "react";
import styled from "styled-components";

const CardlessItem = styled.div`
  pointer: cursor;
  &:hover {
    background-color: ${props => props.theme.borderColour};
  }
  padding: 10px;
  border-radius: 2px;
`;
const HeaderLink = styled.a`
  color: black;
  text-decoration: none;
  font-weight: bold;
  padding-bottom: 5px;
  &:visited {
    color: ${props => props.theme.primaryColour};
  }
`;
const Subtext = styled.p`
  font-size: 14px;
  padding-bottom: 5px;
`;
const SubtextSource = styled(Subtext)`
  font-size: 12px;
  font-weight: bold;
  margin: 0;
  padding: 0;
`;

const Root = ({ item }) => {
  return (
    <CardlessItem>
      <HeaderLink href={item.link} target="_blank">
        {item.title}
      </HeaderLink>
      <br />
      <Subtext>{item.subtitle}</Subtext>
      <SubtextSource>{item.source}</SubtextSource>
    </CardlessItem>
  );
};

export default Root;
