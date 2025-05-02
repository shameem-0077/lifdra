import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { secondsTohm } from "../../../../helpers/functions";
import { useSelector } from "react-redux";

const ProfessionSkillCard = ({ data, background, subject_slug }) => {
  const { user_profile } = useSelector((state) => state);
  return data.status === "locked" ? (
    <LockedContainer background={background}>
      <ImageBox>
        <Image src={data.image} />
      </ImageBox>
      <ContentBox>
        <TopContent>
          <Skill>Skill {data.order_id}</Skill>
          <LabelContainer>
            <Label>
              {data.status === "completed"
                ? "Completed"
                : data.status === "pending"
                ? "Pending"
                : "Locked"}
            </Label>
            <LabelIcon className="las la-check-circle"></LabelIcon>
          </LabelContainer>
        </TopContent>
        <MiddleContent>
          <SkillName>{data.name}</SkillName>
        </MiddleContent>
        <BottomContent>
          {data.status !== "locked" && (
            <>
              <LeftContent>
                <Icon className="las la-layer-group"></Icon>
                <LessonCount>{data.lessons} Lessons</LessonCount>
              </LeftContent>
              <RightContent>
                <Icon className="las la-clock"></Icon>
                <TimeCount>3 hrs, 53 mins</TimeCount>
              </RightContent>
            </>
          )}
        </BottomContent>
      </ContentBox>
      <StatusIcon
        status={data.status}
        className={`las ${
          data.status === "completed"
            ? "la-check-circle"
            : data.status === "pending"
            ? "la-spinner"
            : "la-lock"
        }`}
      ></StatusIcon>
    </LockedContainer>
  ) : (
    <CardContainer
      background={background}
      to={`/nanodegree/${subject_slug}/lessons/${data.id}/`}
    >
      <ImageBox>
        <Image src={data.image} />
      </ImageBox>
      <ContentBox>
        <TopContent>
          <Skill>Skill {data.order_id}</Skill>
          <LabelContainer>
            <Label>
              {data.status === "completed"
                ? "Completed"
                : data.status === "pending"
                ? "Pending"
                : "Locked"}
            </Label>
            <LabelIcon className="las la-check-circle"></LabelIcon>
          </LabelContainer>
        </TopContent>
        <MiddleContent>
          <SkillName>{data.name}</SkillName>
        </MiddleContent>
        <BottomContent>
          {data.status !== "locked" && (
            <>
              <LeftContent>
                <Icon className="las la-layer-group"></Icon>
                <LessonCount>{data.lessons} Lessons</LessonCount>
              </LeftContent>
              <RightContent>
                <Icon className="las la-clock"></Icon>
                <TimeCount>{secondsTohm(data.duration)}</TimeCount>
              </RightContent>
            </>
          )}
        </BottomContent>
      </ContentBox>
      <StatusIcon
        status={data.status}
        className={`las ${
          data.status === "completed"
            ? "la-check-circle"
            : data.status === "pending"
            ? "la-spinner"
            : "la-lock"
        }`}
      ></StatusIcon>
    </CardContainer>
  );
};

export default ProfessionSkillCard;

const CardContainer = styled(Link)`
  display: flex;
  align-items: center;
  padding: 19px;
  border-radius: 7px;
  background: #f9f9f9;
  position: relative;
  min-height: 145px;
  @media all and (max-width: 680px) {
    min-width: 280px;
    background: ${(data) => data.background};
    border-radius: 10px;
    padding: 15px;
    margin-right: 15px;
  }
`;
const LockedContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 19px;
  border-radius: 7px;
  background: #f9f9f9;
  position: relative;
  cursor: not-allowed;
  &::after {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    width: 100%;
    bottom: 0;
    background: rgba(255, 255, 255, 0.4);
  }
  @media all and (max-width: 680px) {
    min-width: 280px;
    background: ${(data) => data.background};
    border-radius: 10px;
    padding: 15px;
    margin-right: 15px;
  }
`;
const StatusIcon = styled.i`
  position: absolute;
  top: 17px;
  right: 17px;
  color: ${(props) =>
    props.status === "completed"
      ? "#50af50"
      : props.status === "pending"
      ? "#f5ad42"
      : "#b7b7b7"};
  font-size: 21px;
  @media (max-width: 680px) {
    color: #fff;
  }
`;
const ImageBox = styled.div`
  max-width: 160px;
  overflow: hidden;
  border-radius: 6px;
  margin-right: 14px;
  height: 100%;
  /* @media (max-width: 1024px) {
        max-width: 100%;
        margin-right: 0;
        margin-bottom: 14px;
    } */
  @media (max-width: 680px) {
    display: none;
  }
  @media (max-width: 640px) {
    max-width: 143px;
    margin-right: 11px;
    margin-bottom: 0;
  }
  @media (max-width: 480px) {
    max-width: 100%;
    margin-bottom: 11px;
    margin-right: 0;
  }
`;
const Image = styled.img`
  width: 100%;
  display: block;
  height: 100%;
  @media all and (max-width: 680px) {
    display: none;
  }
`;
const ContentBox = styled.div`
  @media all and (max-width: 680px) {
    color: #fff;
    width: 100%;
  }
`;
const TopContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Skill = styled.p`
  font-size: 12px;
  font-family: gordita_regular;
  color: rgb(158, 158, 158);
  @media all and (max-width: 680px) {
    font-size: 12px;
    color: #fff;
    /* margin-bottom: 20px; */
  }
`;
const LabelContainer = styled.span`
  display: none;
  background: rgb(76, 175, 80);
  padding: 5px 15px;
  border-radius: 5px;
  margin-left: 10px;
  font-family: baloo_paaji_2semibold;
  @media all and (max-width: 680px) {
    background: none;
    padding: 0;
    border-radius: none;
    margin-left: 10px;
    font-family: baloo_paaji_2semibold;
  }
`;
const Label = styled.small`
  color: #fff;
  font-size: 16px;
  @media all and (max-width: 680px) {
    display: none;
  }
`;
const LabelIcon = styled.small`
  display: none;
  @media all and (max-width: 680px) {
    display: block;
    font-size: 24px;
  }
`;
const MiddleContent = styled.div`
  margin: 10px 0;
  @media all and (max-width: 680px) {
    margin: 10px 0px 15px;
  }
`;
const SkillName = styled.span`
  font-family: gordita_medium;
  font-size: 16px;
`;
const BottomContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 980px) {
    flex-direction: column;
    align-items: flex-start;
  }
  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;
const LeftContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 9px;
`;
const Icon = styled.small`
  color: rgb(76, 175, 80);
  font-size: 18px;
  margin-right: 4px;
  @media all and (max-width: 680px) {
    font-size: 24px;
    color: #fff;
  }
`;
const LessonCount = styled.p`
  color: rgb(153, 153, 153);
  font-size: 12px;
  font-family: gordita_regular;
  transform: translateY(2px);
  @media all and (max-width: 680px) {
    color: #fff;
  }
`;
const TimeCount = styled.p`
  color: rgb(153, 153, 153);
  font-size: 12px;
  font-family: gordita_regular;
  transform: translateY(2px);
  @media all and (max-width: 680px) {
    color: #fff;
  }
`;
const RightContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
