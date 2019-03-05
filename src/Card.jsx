import React from "react";
import styled from "styled-components";

const Card = styled.section`
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
  width: 320px;
  height: 400px;
  box-shadow: 3px 5px rgba(0, 0, 0, 0.5);
`;

const ExportedCard = props => {
  return <Card>{props.children}</Card>;
};

export default ExportedCard;
