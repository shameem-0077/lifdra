import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { secondsTohms } from "../../../../helpers/functions";
import { useSelector } from "react-redux";

export default function WorkshopTopicSmallCard({ topic, id, subject_slug }) {
  return topic.status === "completed" || topic.status === "on_process" ? (
    <Container
      id={topic.id}
      current_topic_id={id}
      status={topic.status}
      to={`/nanodegree/${subject_slug}/workshops/view/${topic.id}/`}
    >
      <ImageContainer>
        <Image src={topic.image} />
      </ImageContainer>
      <Right>
        <Title>{topic.title}</Title>
        <Duration>{secondsTohms(topic.duration)}</Duration>
      </Right>
      <Status status={topic.status}>
        {topic.status === "completed"
          ? "Completed"
          : topic.status === "on_process" && "On progress"}
      </Status>
    </Container>
  ) : (
    <LockedContainer>
      <ImageContainer>
        <Image src={topic.image} />
      </ImageContainer>
      <Right>
        <Title>{topic.name}</Title>
        <Duration>{secondsTohms(topic.duration)}</Duration>
      </Right>
      <LockImg src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/outline-lock.svg" />
    </LockedContainer>
  );
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
    display: none;
    position: absolute;
    content: "";
    /* display: ${(props) =>
      props.id === props.current_topic_id ? "block" : "none"}; */
    height: 10px;
    width: 10px;
    background: #73e94a;
    border-radius: 50%;
    right: 0;
    top: 23px;
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
const Status = styled.span`
  position: absolute;
  bottom: 10px;
  right: 10px;
  bottom: 10px;
  right: 10px;
  color: ${(props) =>
    props.status === "completed"
      ? "#57c081"
      : props.status === "on_process" && "#f7ca4a"};
  font-style: italic;
  font-size: 14px;
  @media all and (max-width: 1024px) {
    bottom: 0;
  }
`;
const LockedContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  filter: grayscale(1);
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
  display: flex;
  justify-content: center;
  border-radius: 7px;
  overflow: hidden;
  margin-right: 12px;
  @media (max-width: 1024px) {
    min-width: 194px;
    max-width: 194px;
    margin-right: 0;
    margin-bottom: 7px;
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
  font-family: "gordita_medium";
  font-size: 16px;
  line-height: 1.4rem;
  width: 100%;
  margin-bottom: -2px;
`;
const Duration = styled.span`
  display: block;
  font-size: 14px;
  color: #9e9e9e;
`;
