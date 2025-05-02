import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { secondsTohms } from "../../../../helpers/functions";

export default function TopicSmallCard({
  topic,
  topic_id,
  is_new_content,
  subject_slug,
  status,
}) {
  return is_new_content ? (
    <Container
      className="anim-fade"
      topic_id={topic_id}
      id={topic.id}
      status="pending"
      to={`/nanodegree/${subject_slug}/new-content/skills/topics/view/${topic.id}/`}
    >
      <ImageContainer>
        <Image src={topic.image} />
      </ImageContainer>
      <Right>
        <Title>{topic.name}</Title>
        <Duration>{secondsTohms(topic.duration)}</Duration>
      </Right>
    </Container>
  ) : topic.status === "completed" ||
    topic.status === "pending" ||
    topic.status === "ongoing" ? (
    <Container
      className="anim-fade"
      topic_id={topic_id}
      id={topic.id}
      status={topic.status}
      to={`/nanodegree/${subject_slug}/topics/view/${topic.id}/`}
    >
      <ImageContainer>
        <Image src={topic.image} />
      </ImageContainer>
      <Right>
        <Title>{topic.name}</Title>
        <Duration>{secondsTohms(topic.duration)}</Duration>
      </Right>
    </Container>
  ) : topic.status === "locked" ? (
    <LockedContainer className="anim-fade">
      <ImageContainer>
        <Image src={topic.image} />
      </ImageContainer>
      <Right>
        <Title>{topic.name}</Title>
        <Duration>{secondsTohms(topic.duration)}</Duration>
      </Right>
      <LockImg
        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/outline-lock.svg"
        alt=""
      />
    </LockedContainer>
  ) : null;
}

const Container = styled(Link)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
  &:last-child {
    margin-bottom: 0;
  }
  &:after {
    position: absolute;
    content: "";
    display: ${(props) => (props.id === props.topic_id ? "block" : "none")};
    height: 10px;
    width: 10px;
    background: #73e94a;
    border-radius: 50%;
    right: 0;
    bottom: 23px;
  }
  @media (max-width: 1024px) {
    flex-direction: column;
    margin-bottom: 0;
    margin-right: 15px;
    align-items: flex-start;
  }
  @media (max-width: 480px) {
    margin-right: 10px;
  }
`;
const LockedContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  filter: grayscale(1);
  cursor: not-allowed;
  &:last-child {
    margin-bottom: 0;
  }
  @media (max-width: 1024px) {
    flex-direction: column;
    margin-bottom: 0;
    margin-right: 15px;
    align-items: flex-start;
  }
  @media (max-width: 480px) {
    margin-right: 10px;
  }
`;
const ImageContainer = styled.div`
  min-width: 121px;
  max-width: 121px;
  // display: flex;
  justify-content: center;
  border-radius: 7px;
  overflow: hidden;
  margin-right: 12px;
  @media (max-width: 1024px) {
    min-width: 194px;
    max-width: 194px;
    margin-right: 0;
    margin-bottom: 7px;
    box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
  }
`;
const Image = styled.img`
  display: block;
  width: 100%;
`;
const Right = styled.div``;
const LockImg = styled.img`
  display: block;
  position: absolute;
  right: 0;
  bottom: 5px;
`;
const Title = styled.span`
  display: block;
  font-family: gordita_medium;
  font-size: 14px;
  line-height: 1.4rem;
  width: 100%;
  margin-bottom: -2px;
`;
const Duration = styled.span`
  display: block;
  font-size: 12px;
  color: #9e9e9e;
  font-family: gordita_regular;
`;
