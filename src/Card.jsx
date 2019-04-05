import React from "react";
import styled from "styled-components";

const Card = styled.section`
  position: relative;
  bottom: 75px;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
  width: 320px;
  min-height: 400px;
  box-shadow: 2px 5px rgba(0, 0, 0, 0.2);
`;

const ExportedCard = props => {
  return <Card>{props.children}</Card>;
};

export default ExportedCard;
