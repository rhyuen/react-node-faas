import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import Cardless from "./Cardless.jsx";
import CardlessItem from "./CardlessItem.jsx";
import LoadingPlaceholder from "./LoadingPlaceholder.jsx";
import EmptyPlaceholder from "./EmptyPlaceholder.jsx";

const Header = styled.h1`
  font-size: 18px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 10px;
`;
class AdRelatedLinks extends Component {
  state = {
    data: [],
    loading: true
  };

  componentDidMount() {
    const url =
      "https://nodefaastwo.netlify.com/.netlify/functions/getLinks?category=economics";
    axios
      .get(url)
      .then(res => {
        this.setState({
          data: res.data.result.slice(0, 3)
        });
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        this.setState({
          loading: false
        });
      });
  }

  render() {
    const { loading, data } = this.state;
    return (
      <Cardless>
        <Header>Related Links</Header>
        <section>
          {loading ? (
            <LoadingPlaceholder>Loading links.</LoadingPlaceholder>
          ) : data.length === 0 ? (
            <EmptyPlaceholder>Nothing to load it seems.</EmptyPlaceholder>
          ) : (
            data.map(item => {
              return <CardlessItem item={item} />;
            })
          )}
        </section>
      </Cardless>
    );
  }
}

export default AdRelatedLinks;
