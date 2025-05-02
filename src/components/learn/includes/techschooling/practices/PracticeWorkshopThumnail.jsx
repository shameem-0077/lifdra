import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PracticeWorkshopThumnail = ({ data, practice_status, subject_slug }) => {
  const user_profile = useSelector((state) => state.user_profile);
  return (
    <Container>
      <Title>Workshop</Title>
      {practice_status === "pending" ? (
        <Desc>Let's complete the practice session and get on to workshop</Desc>
      ) : (
        <Desc>
          Attend the workshop below for better understanding of the practice you
          have completed
        </Desc>
      )}
      {practice_status === "pending" ? (
        <CardContainerInactive
          bg_image={data.image}
          to={`/nanodegree/${subject_slug}/workshops/view/${data.workshop}/`}
        >
          <Content>
            <IconContainer>
              <Icon className="las la-play"></Icon>
            </IconContainer>
            <Label>Workshop</Label>
            <CardTitle>{data.title}</CardTitle>
            <Description>{data.description}</Description>
          </Content>
        </CardContainerInactive>
      ) : (
        <CardContainer
          bg_image={data.image}
          to={`/nanodegree/${subject_slug}/workshops/view/${data.workshop}/`}
        >
          <Content>
            <IconContainer>
              <Icon className="las la-play"></Icon>
            </IconContainer>
            <Label>Workshop</Label>
            <CardTitle>{data.title}</CardTitle>
            <Description>{data.description}</Description>
          </Content>
        </CardContainer>
      )}
    </Container>
  );
};

export default PracticeWorkshopThumnail;
const Container = styled.div`
  padding-bottom: 20px;
  @media all and (max-width: 480px) {
    padding-bottom: 0px;
  }
`;
const LeftContainer = styled.div`
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  width: 30%;
  height: 200px;
  border-radius: 5px;
  min-width: 125px;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    display: block;
  }
  @media all and (max-width: 1200px) {
    display: flex;
    width: 45%;
    min-width: 125px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media all and (max-width: 1080px) {
    width: 45%;
    height: 200px;
    margin: auto;
  }
  @media all and (max-width: 980px) {
    width: 80%;
    height: 250px;
    margin: auto;
    margin-bottom: 17px;
  }
  @media all and (max-width: 768px) {
    height: 300px;
  }
  @media all and (max-width: 640px) {
    height: 250px;
  }
  @media all and (max-width: 480px) {
    width: 100%;
  }
  @media all and (max-width: 360px) {
    height: 200px;
  }
`;
const CardContainer = styled(Link)`
  display: block;
  display: flex;
  background-color: #f9f9fb;
  border-radius: 3px;
  @media all and (max-width: 980px) {
    flex-wrap: wrap;
    padding: 20px;
  }
  @media all and (max-width: 480px) {
    padding: 15px;
  }
`;
const CardContainerInactive = styled.div`
  cursor: not-allowed;
  background-color: #f9f9fb;
  border-radius: 20px;
`;
const Title = styled.h2`
  color: #4d4d4d;
  font-size: 20px;
  font-family: gordita_medium;
  @media all and (max-width: 640px) {
    font-size: 16px;
  }
`;
const Desc = styled.p`
  font-size: 14px;
  margin-bottom: 15px;
  font-family: gordita_regular;
  @media all and (max-width: 980px) {
    font-size: 14px;
  }
`;

const Content = styled.div`
  padding: 30px;
  cursor: auto;
  max-width: 70%;
  @media all and (max-width: 1200px) {
    padding: 15px;
  }
  @media all and (max-width: 980px) {
    padding: 0px;
    max-width: 100%;
    width: 100%;
  }
  @media all and (max-width: 480px) {
  }
`;
const IconContainer = styled.span`
  color: #0fa76f;
  font-weight: 600;
  font-size: 14px;
  width: 45%;
  cursor: pointer;
  @media all and (max-width: 1200px) {
    width: 100%;
  }
`;
const Icon = styled.img`
  color: #fff;
  font-size: 55px;
`;
const Play = styled.img`
  width: 100%;
  display: block;
`;
const Label = styled.small`
  display: block;
  font-size: 14px;
  color: #4d4d4d;
  font-family: gordita_medium;
`;
const CardTitle = styled.h6`
  font-size: 16px;
  color: #4d4d4d;
  font-family: gordita_medium;
  margin-bottom: 10px;
`;
const Description = styled.p`
  font-size: 14px;
  color: #737782;
  margin-bottom: 15px;
  font-family: gordita_regular;
  @media all and (max-width: 980px) {
    font-size: 14px;
  }
  @media all and (max-width: 480px) {
    /* font-size: 12px; */
  }
`;
