import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { secondsTohm } from "../../../../helpers/functions";
import { useSelector } from "react-redux";

function LessonCard({ lesson, subject_slug }) {
  const { user_profile } = useSelector((state) => state);
  return (
    <>
      {lesson.status === "locked" ? (
        <LockedCard className="anim-fade">
          <ImageContainer>
            <Image src={lesson.image} />
          </ImageContainer>
          <Content>
            <div>
              <ContentTop>
                <Heading>{lesson.name}</Heading>
                <Button>
                  {lesson.status === "completed"
                    ? "Completed"
                    : lesson.status === "pending"
                    ? "On progress"
                    : "Locked"}
                </Button>
              </ContentTop>
              <ContentMiddle>
                <Paragraph>{lesson.description}</Paragraph>
              </ContentMiddle>
            </div>
            <ContentBottom>
              <BottomLeft>
                <Icon1 className="las la-play-circle"></Icon1>
                <Topic>{lesson.topics} Topics</Topic>
              </BottomLeft>
              <BottomRight>
                <Icon2 className="las la-clock"></Icon2>
                <Time>{secondsTohm(lesson.duration)}</Time>
              </BottomRight>
            </ContentBottom>
          </Content>
        </LockedCard>
      ) : (
        <Card
          className="anim-fade"
          to={`/nanodegree/${subject_slug}/topics/view/${lesson.current_topic}/`}
        >
          <ImageContainer>
            <Image src={lesson.image} />
          </ImageContainer>
          <Content>
            <div>
              <ContentTop>
                <Heading>{lesson.name}</Heading>
                <Button status={lesson.status}>
                  {lesson.status === "completed"
                    ? "Completed"
                    : lesson.status === "pending"
                    ? "On progress"
                    : "Locked"}
                </Button>
              </ContentTop>
              <ContentMiddle>
                <Paragraph>{lesson.description}</Paragraph>
              </ContentMiddle>
            </div>
            <ContentBottom>
              <BottomLeft>
                <Icon1 className="las la-play-circle"></Icon1>
                <Topic>{lesson.topics} Topics</Topic>
              </BottomLeft>
              <BottomRight>
                <Icon2 className="las la-clock"></Icon2>
                <Time> {secondsTohm(lesson.duration)}</Time>
              </BottomRight>
            </ContentBottom>
          </Content>
        </Card>
      )}
    </>
  );
}

export default LessonCard;

const Card = styled(Link)`
  box-shadow: 0 16px 24px rgba(0, 0, 0, 0.1);
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;
const LockedCard = styled.div`
  box-shadow: 0 16px 24px rgba(0, 0, 0, 0.1);
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  cursor: not-allowed;
  &:before {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    content: "";
    background: rgba(255, 255, 255, 0.6);
  }
`;
const ImageContainer = styled.div`
  overflow: hidden;
  min-height: 241px;
  max-height: 241px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Image = styled.img`
  display: block;
  width: 100%;
`;
const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px;
  @media only screen and (max-width: 480px) {
    padding: 14px 24px;
  }
`;
const ContentTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Heading = styled.h3`
  font-family: gordita_medium;
  letter-spacing: 1px;
  width: 88%;
  font-size: 16px;
  @media only screen and (max-width: 1024px) {
    font-size: 16px;
    line-height: 1.3em;
  }
`;
const Button = styled.span`
  display: inline-block;
  background: ${(props) =>
    props.status === "completed"
      ? "rgb(76, 175, 80)"
      : props.status === "pending"
      ? "rgb(255, 174, 66)"
      : "#b7b7b7"};
  padding: 6px;
  border-radius: 30px;
  color: rgb(255, 255, 255);
  font-family: gordita_medium;
  font-size: 14px;
  width: 140px;
  text-align: center;
  @media only screen and (max-width: 1024px) {
    font-size: 14px;
  }
`;
const ContentMiddle = styled.div``;
const Paragraph = styled.p`
  margin: 20px 0px;
  color: rgb(69, 90, 100);
  font-family: gordita_regular;
  font-size: 14px;
`;
const ContentBottom = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: start;
  justify-content: flex-start;
  @media only screen and (max-width: 860px) {
    flex-direction: column;
    align-items: flex-start;
  }
  @media only screen and (max-width: 640px) {
    flex-direction: row;
    align-items: center;
  }
`;
const BottomLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
`;
const Icon1 = styled.i`
  color: rgb(153, 153, 153);
  font-size: 28px;
  margin-right: 10px;
`;
const Topic = styled.span`
  color: rgb(153, 153, 153);
  font-size: 13px;
  font-family: gordita_regular;
  transform: translateY(2px);
`;
const BottomRight = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  @media only screen and (max-width: 860px) {
    margin-top: 10px;
  }
  @media only screen and (max-width: 640px) {
    margin-top: 0;
  }
`;
const Icon2 = styled.i`
  color: rgb(153, 153, 153);
  font-size: 28px;
  margin-right: 10px;
`;
const Time = styled.span`
  color: rgb(153, 153, 153);
  font-size: 13px;
  font-family: gordita_regular;
  transform: translateY(2px);
`;
