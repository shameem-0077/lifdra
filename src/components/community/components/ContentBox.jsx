import React from "react";
import styled from "styled-components";

function ContentBox({ content }) {
  return (
    <Container>
      <Heading>Bio</Heading>
      <Content>
        <pre>{content ?? "...loading"}</pre>
      </Content>
    </Container>
  );
}

export default ContentBox;

const Container = styled.div`
  background: #f9f9fb;
  padding: 24px;
  border-radius: 8px;
  /* margin-bottom: 32px; */
  width: 100%;

  @media (max-width: 376px) {
    margin-bottom: 15px;
  }
`;
const Heading = styled.h4`
  font-size: 18px;
  margin-bottom: 14px;
  font-family: "gordita_medium";
  color: #2d2d2d;
  @media (max-width: 640px) {
    font-size: 15px;
  }
`;
const Content = styled.p`
  font-size: 16px;
  overflow-wrap: break-word;
  word-break: break-all;
  word-break: normal;
  pre {
    display: block;
    width: 100%;
    white-space: break-spaces;
  }
  @media (max-width: 640px) {
    font-size: 13px;
  }
  @media (max-width: 360px) {
    /* font-size: 12px; */
  }
`;
