import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useParams } from "react-router-dom";
function WorkShopCard({ data, index, activeLesson, setActiveLesson }) {
  const { slug } = useParams();

  const lockedCard = () => {
    return (
      <>
        <LockedContainer>
          <LeftSection>
            <SkillName>
              <Label>Workshop</Label>
              <DesignationCover>
                <span className="number">
                  {" "}
                  {data.daily_syllabus_order_id <= 9 && "0"}
                  {data.daily_syllabus_order_id}&nbsp;
                </span>
                {data.workshop_topic_data.skill_name}
              </DesignationCover>
            </SkillName>
            <TopicName>{data.workshop_topic_data.title}</TopicName>
          </LeftSection>
          <RightSection>
            <ThumnailImage>
              <img src={data.workshop_topic_data.image} alt="Video thumnail" />

              {data.status === "ongoing" ? (
                <LockImage>
                  <img
                    src={require("../../../../../assets/images/day-by-day/ongoing.svg")}
                    alt="Icon"
                  />
                </LockImage>
              ) : (
                <LockImage>
                  <img
                    src={require("../../../../../assets/images/day-by-day/play.png")}
                    alt="Icon"
                  />
                </LockImage>
              )}
            </ThumnailImage>
          </RightSection>
        </LockedContainer>
      </>
    );
  };
  return (
    <>
      {data.status === "locked" ? (
        lockedCard()
      ) : (
        <>
          <Container
            to={`/nanodegree/${slug}/workshops/view/${data.workshop_topic_data.id}`}
            className={data.id === activeLesson && "active"}
            onClick={() => setActiveLesson(data.id)}
          >
            <LeftSection>
              <SkillName>
                <Label>Workshop</Label>
                <DesignationCover>
                  <span className="number">
                    {" "}
                    {data.daily_syllabus_order_id <= 9 && "0"}
                    {data.daily_syllabus_order_id}&nbsp;
                  </span>
                  {data.workshop_topic_data.skill_name}
                </DesignationCover>
              </SkillName>
              <TopicName>{data.workshop_topic_data.title}</TopicName>
            </LeftSection>
            <RightSection>
              <ThumnailImage>
                <img
                  src={data.workshop_topic_data.image}
                  alt="Video thumnail"
                />{" "}
                <LockImage>
                  <img
                    src={require("../../../../../assets/images/day-by-day/play.png")}
                    alt="Icon"
                  />
                </LockImage>
              </ThumnailImage>
            </RightSection>
          </Container>
        </>
      )}
    </>
  );
}

export default WorkShopCard;

const Container = styled(Link)`
  display: block;
  padding: 15px 20px;
  border: 1px solid #e8ecef;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.4s ease;
  position: relative;
  transition: all 0.4s ease;
  cursor: pointer;

  @media all and (max-width: 360px) {
    padding: 10px;
  }
  &:after {
    content: "";
    height: 0;
    position: absolute;
    height: 0%;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 6px;
    background-color: #8bc38f;
    border-radius: 0 5px 5px 0;
    transition: all 0.1s ease;
  }
  &:hover {
    background: #0fa76f0f;
    border: 1px solid rgba(139, 195, 143, 0.3);
    &:after {
      height: 80%;
      @media (max-width: 480px) {
        height: 0%;
      }
    }
  }
  &.active {
    background: #0fa76f0f;
    border: 1px solid rgba(139, 195, 143, 0.3);
    &:after {
      height: 80%;
    }
  }
  @media all and (max-width: 360px) {
    padding: 8px;
  }
`;

const LeftSection = styled.div`
  order: 1;
`;
const RightSection = styled.div`
  order: 2;
  @media screen and (max-width: 480px) {
    max-width: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
  }
  @media screen and (max-width: 360px) {
    max-width: 100px;

    /* align-items: center; */
  }
`;
const SkillName = styled.p`
  font-family: gordita_medium;
  font-size: 14px;
  color: #ff7a4f;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media all and (max-width: 640px) {
    flex-wrap: wrap;
  }
  @media all and (max-width: 480px) {
    flex-wrap: wrap;
    margin-bottom: 5px;
  }
  @media all and (max-width: 360px) {
    font-size: 13px;
  }
  span {
    font-size: inherit;
    color: #1a987c;
    &.number {
      color: #ff7a4f !important;
    }
  }
`;
const TopicName = styled.h4`
  font-size: 16px;
  margin-bottom: 10px;
  font-family: gordita_medium;
  color: #3e3e3e;
  @media all and (max-width: 640px) {
    font-size: 14px;
  }
  @media all and (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 5px;
  }
`;
const TotalDuration = styled.span`
  font-size: 13px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media all and (max-width: 360px) {
    align-items: flex-end;
    font-style: 12px;
  }
`;
const Clock = styled.span`
  display: block;
  width: 20px;
  margin-right: 5px;
  transform: translateY(-2px);
  @media all and (max-width: 360px) {
    width: 16px;
  }
  img {
    display: block;
    width: 100%;
  }
`;
const ThumnailImage = styled.div`
  position: relative;
  max-width: 150px;
  min-width: 150px;
  margin-left: 30px;
  border-radius: 10px;
  overflow: hidden;
  img {
    display: block;
    width: 100%;
  }
  @media all and (max-width: 480px) {
    max-width: 120px;
    width: 120px;
    min-width: 100%;
    margin-left: 0;
    /* margin-bottom: 20px; */
  }
  @media screen and (max-width: 360px) {
    max-width: 100px;
    width: 100px;
    min-width: 100%;

    /* align-items: center; */
  }
`;
const LockImage = styled.span`
  max-width: 40px;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  @media all and (max-width: 480px) {
    max-width: 35px;
  }
`;
const LockedContainer = styled.div`
  /* margin-left: ${(props) => (props.active ? "0px" : "20px")}; */
  padding: 20px;
  border: 1px solid #e8ecef;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.4s ease;
  position: relative;
  transition: all 0.4s ease;
  filter: grayscale(1);
  cursor: not-allowed;
  @media all and (max-width: 480px) {
    /* flex-direction: column-reverse;
        flex-wrap: wrap;
        align-items: flex-start; */
  }
  @media all and (max-width: 360px) {
    /* flex-direction: column-reverse;
        flex-wrap: wrap; */
    padding: 10px;
  }
  &:after {
    content: "";
    height: 0;
    position: absolute;
    height: 0%;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 6px;
    background-color: #8bc38f;
    border-radius: 0 5px 5px 0;
    transition: all 0.4s ease;
  }

  @media all and (max-width: 360px) {
    padding: 8px;
  }
`;
const Label = styled.span`
  padding: 3px 15px;
  background: #eac954;
  min-width: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  border-radius: 3px;
  color: #fff !important;
  font-size: 13px;
`;
const DesignationCover = styled.span`
  @media (max-width: 640px) {
    width: 100%;
    margin-top: 10px;
  }
  @media (max-width: 480px) {
    width: 100%;
    margin-top: 5px;
  }
`;
