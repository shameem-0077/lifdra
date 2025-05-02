import { useState } from "preact/hooks";
import React from "react";
import styled from "styled-components";
import LeaderBoardCard from "../LeaderBoardCard";

function HowLeaderBoardWorks({ isModal, setModal }) {
  const Items = [
    {
      id: 1,
      points: 1,
      topic: <p>1 Topic</p>,
    },
    {
      id: 2,
      points: 2,
      topic: <p>Day Completion</p>,
    },
    {
      id: 3,
      points: 2,
      topic: <p>Complete a Practice</p>,
    },
    // {
    //   id: 4,
    //   points: 5,
    //   topic: <p>Score 10 in a Practice</p>,
    // },
    // {
    //   id: 5,
    //   points: 4,
    //   topic: <p>Score 9 in a Practice</p>,
    // },
    // {
    //   id: 6,
    //   points: 3,
    //   topic: <p>Score 8 in a Practice</p>,
    // },
    // {
    //   id: 7,
    //   points: 2,
    //   topic: <p>Score 7 in a Practice</p>,
    // },
    // {
    //   id: 8,
    //   points: 1,
    //   topic: <p>Score 6 in a Practice</p>,
    // },
    {
      id: 9,
      points: 1,
      topic: <p>Workshop Topic</p>,
    },
    {
      id: 10,
      points: 2,
      topic: <p>Complete an Assessment</p>,
    },
    // {
    //   id: 11,
    //   points: 5,
    //   topic: <p>Score 10 in an Assessment</p>,
    // },
    // {
    //   id: 12,
    //   points: 4,
    //   topic: <p>Score 9 in an Assessment</p>,
    // },
    // {
    //   id: 13,
    //   points: 3,
    //   topic: <p>Score 8 in an Assessment</p>,
    // },
    // {
    //   id: 14,
    //   points: 2,
    //   topic: <p>Score 7 in an Assessment</p>,
    // },
    // {
    //   id: 15,
    //   points: 1,
    //   topic: <p>Score 6 in an Assessment</p>,
    // },
    {
      id: 16,
      points: 5,
      topic: <p>Complete a Skill</p>,
    },
    // {
    //   id: 17,
    //   points: 5,
    //   topic: <p>Skill Score&nbsp;-&nbsp;10</p>,
    // },
    // {
    //   id: 18,
    //   points: 4,
    //   topic: <p>Skill Score&nbsp;-&nbsp;9</p>,
    // },
    // {
    //   id: 19,
    //   points: 3,
    //   topic: <p>Skill Score&nbsp;-&nbsp;8</p>,
    // },
    // {
    //   id: 20,
    //   points: 2,
    //   topic: <p>Skill Score&nbsp;-&nbsp;7</p>,
    // },
    // {
    //   id: 21,
    //   points: 1,
    //   topic: <p>Skill Score&nbsp;-&nbsp;6</p>,
    // },
    {
      id: 22,
      points: 5,
      topic: <p>Complete a Profession</p>,
    },
    // {
    //   id: 23,
    //   points: 5,
    //   topic: <p>Profession Score&nbsp;-&nbsp;10</p>,
    // },
    // {
    //   id: 24,
    //   points: 4,
    //   topic: <p>Profession Score&nbsp;-&nbsp;9</p>,
    // },
    // {
    //   id: 25,
    //   points: 3,
    //   topic: <p>Profession Score&nbsp;-&nbsp;8</p>,
    // },
    // {
    //   id: 26,
    //   points: 2,
    //   topic: <p>Profession Score&nbsp;-&nbsp;7</p>,
    // },
    // {
    //   id: 27,
    //   points: 1,
    //   topic: <p>Profession Score&nbsp;-&nbsp;6</p>,
    // },
    {
      id: 28,
      points: 1,
      topic: <p>Daily Attendance</p>,
    },
    // {
    // 	id: 29,
    // 	points: 2,
    // 	topic: <p>Continuous 5&nbsp;days</p>,
    // },
    // {
    // 	id: 30,
    // 	points: 3,
    // 	topic: <p>Continuous 10&nbsp;days</p>,
    // },
    // {
    // 	id: 31,
    // 	points: 5,
    // 	topic: <p>Continuous 15&nbsp;days</p>,
    // },
    // {
    // 	id: 32,
    // 	points: 8,
    // 	topic: <p>Continuous 20&nbsp;days</p>,
    // },
    // {
    // 	id: 33,
    // 	points: 10,
    // 	topic: <p>Continuous 25&nbsp;days</p>,
    // },
    // {
    // 	id: 34,
    // 	points: 15,
    // 	topic: <p>Continuous 30&nbsp;days</p>,
    // },
    // {
    // 	id: 35,
    // 	points: 30,
    // 	topic: <p>Continuous 60&nbsp;days</p>,
    // },
    // {
    // 	id: 36,
    // 	points: 50,
    // 	topic: <p>Continuous 90&nbsp;days</p>,
    // },
  ];
  return (
    <Container style={{ transform: isModal && "scale(1,1)" }}>
      <Overlay></Overlay>
      <LeaderBoardSection>
        <ContentSection>
          <TopSection>
            <Heading>How leaderboard works?</Heading>
            <CancelDiv onClick={() => setModal(false)}>
              <CancelImg
                src={require("../../../../../../../assets/images/leader-board/modal/close-icon.svg")}
              />
            </CancelDiv>
          </TopSection>
          <Cover>
            <MiddleSection>
              <SubHeading>How you can gain points</SubHeading>
              <CardSection>
                {Items.map((data) => (
                  <LeaderBoardCard data={data} key={data.id} />
                ))}
              </CardSection>
            </MiddleSection>

            <BottomSection>
              <SubTitle>How you lose points</SubTitle>
              <BottomContainer>
                <Left>
                  <Content>1 day account inactive </Content>
                  <Description>
                    When account was continuously inactive
                  </Description>
                </Left>
                <Right>
                  <Span>-1</Span>
                  <Points>Point</Points>
                </Right>
              </BottomContainer>
            </BottomSection>
          </Cover>
        </ContentSection>
      </LeaderBoardSection>
    </Container>
  );
}

export default HowLeaderBoardWorks;
const Container = styled.div`
  position: fixed;
  transition: 0.3s;
  transform: scale(0, 0);
  width: 100%;
  height: 100vh;
  z-index: 1000;
  left: 0;
  top: 0px;
  backdrop-filter: blur(4px);
`;
const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0px;
  width: 100%;
  height: 100vh;
`;

const LeaderBoardSection = styled.div`
  width: 900px;
  max-width: 900px;
  max-height: 80vh;
  overflow: hidden;
  margin: 0 auto;
  background: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  padding: 50px 40px;
  border-radius: 10px;
  transition: 0.5s;
  z-index: 101;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  @media (max-width: 980px) {
    width: 700px;
    padding: 50px 30px;
  }
  @media (max-width: 768px) {
    width: 560px;
  }
  @media (max-width: 640px) {
    width: 440px;
    padding: 50px 20px;
  }
  @media (max-width: 480px) {
    width: 350px;
    padding: 20px 16px;
  }
  @media (max-width: 360px) {
    width: 305px;
  }
`;
const ContentSection = styled.div``;
const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(212, 212, 212, 0.3);
  padding-bottom: 25px;
  @media all and (max-width: 480px) {
    padding-bottom: 14px;
  }
`;
const Heading = styled.h2`
  color: #4b4c4a;
  font-size: 18px;
  font-family: "gordita_medium";
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;
const Cover = styled.div`
  /* max-height: calc(80vh - 145px); */
  /* overflow-y: scroll;
    scroll-behavior: smooth;
    ::-webkit-scrollbar {
        display: none;
    } */
`;
const MiddleSection = styled.div`
  margin-top: 20px;
`;
const SubHeading = styled.h4`
  margin-bottom: 10px;
  color: #4b4c4a;
  font-size: 16px;
  font-family: "gordita_medium";
  @media (max-width: 480px) {
    font-size: 15px;
    margin-bottom: 15px;
  }
`;
const CardSection = styled.div`
  height: calc(80vh - 360px);
  overflow-y: scroll;
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    display: none;
  }
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 10px;

  @media all and (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media all and (max-width: 640px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media all and (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }
  @media all and (max-height: 400px) {
    height: calc(80vh - 200px);
  }
`;
const BottomSection = styled.div`
  margin-top: 30px;
`;
const SubTitle = styled.h4`
  color: #4b4c4a;
  font-size: 16px;
  font-family: "gordita_medium";
  @media (max-width: 480px) {
    font-size: 15px;
  }
`;
const BottomContainer = styled.div`
  background-color: #f9f9fb;
  margin-top: 10px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media all and (max-width: 360px) {
    padding: 20px 15px;
  }
`;
const Left = styled.div``;

const Content = styled.div`
  color: #4b4c4a;
  font-family: "gordita_medium";
  font-size: 16px;
  @media all and (max-width: 640px) {
    font-size: 14px;
  }
`;

const Description = styled.p`
  color: #3c3c3c;
  font-size: 14px;
  font-family: "gordita_regular";
  @media all and (max-width: 640px) {
    font-size: 12px;
  }
`;

const Right = styled.div`
  /* display: flex;
    justify-content: flex-end;
    min-width: 100px;
    flex-wrap: wrap; */
  display: flex;
  min-width: 90px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
  @media all and (max-width: 640px) {
    min-width: 60px;
  }
  @media all and (max-width: 360px) {
    flex-wrap: wrap;
    justify-content: flex-end;
  }
`;
const Span = styled.span`
  color: #ff683a;
  font-size: 22px;
  font-family: "gordita_medium";
  /* display: block; */
  width: 100%;
  text-align: right;
  @media all and (max-width: 640px) {
    font-size: 20px;
  }
  @media all and (max-width: 360px) {
    text-align: right;
  }
`;
const Points = styled.p`
  color: #4b4c4a;
  font-size: 14px;
  font-family: "gordita_regular";
  @media all and (max-width: 640px) {
    font-size: 12px;
    margin-left: 5px;
  }
  @media all and (max-width: 360px) {
    margin-left: 0;
  }
`;
const CancelDiv = styled.div`
  cursor: pointer;
  width: 20px;
  @media all and (max-width: 640px) {
    width: 16px;
  }
  @media all and (max-width: 480px) {
    width: 15px;
  }
`;
const CancelImg = styled.img`
  width: 100%;
  display: block;
`;
