import styled from "styled-components";

const FeedCard = styled.div`
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px 20px;
  border-bottom: 5px solid ${props => props.theme.primaryColour};
  width: 100%;
  margin-bottom: 20px;
`;

const ExportedFeedCard = props => {
  return <FeedCard>{props.children}</FeedCard>;
};

export default ExportedFeedCard;
