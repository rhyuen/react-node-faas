import styled from "styled-components";

const FeedCard = styled.div`
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  width: 100%;
  margin-bottom: 20px;
`;

const ExportedFeedCard = props => {
  return <FeedCard>{props.children}</FeedCard>;
};

export default ExportedFeedCard;
