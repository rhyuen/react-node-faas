import React from "react";
import styled from "styled-components";

const Card = styled.section`
  position: relative;
  bottom: 75px;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 2px;
  width: 320px;
  min-height: 400px;  
`;

const ExportedCard = props => {
  return <Card>{props.children}</Card>;
};

export default ExportedCard;
