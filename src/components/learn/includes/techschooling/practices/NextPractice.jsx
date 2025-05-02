import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NextPractice = ({ data, subject_slug }) => {
  const userSubscriptionType = useSelector(
    (state) => state.userSubscriptionType
  );
  // console.log(data,"---data----");

  return userSubscriptionType === "expired_subscription" ||
    userSubscriptionType === "trial_end" ? (
    <LockedContainer>
      <ImageContainer>
        <Image src={data.image} alt="" />
      </ImageContainer>
      <ContentArea>
        <ContentTitle>
          {data.order_id < 10 ? (
            <HighLight>#0{data.order_id}</HighLight>
          ) : (
            <HighLight>#{data.order_id}</HighLight>
          )}{" "}
          | {data.title}
        </ContentTitle>
        <PraticeLabel>
          {/* <Icon>
                        <Layer className="las la-layer-group"></Layer>
                    </Icon> */}
          <Label>
            {data.designation} / {data.skills}
          </Label>
        </PraticeLabel>
        {/* <Duration>
                    <ClockIcon>
                        <Clock className="las la-clock"></Clock>
                    </ClockIcon>
                    <ClockLabel>{data.duration}</ClockLabel>
                </Duration> */}
      </ContentArea>
    </LockedContainer>
  ) : (
    <Container
      to={`/nanodegree/${subject_slug}/practices/view/${data.id}/`}
    >
      <ImageContainer>
        <Image src={data.image} alt="" />
      </ImageContainer>
      <ContentArea>
        <ContentTitle>
          {data.order_id > 10 ? (
            <HighLight>#{data.order_id}</HighLight>
          ) : (
            <HighLight>#0{data.order_id}</HighLight>
          )}{" "}
          | {data.title}
        </ContentTitle>
        <PraticeLabel>
          {/* <Icon>
                        <Layer className="las la-layer-group"></Layer>
                    </Icon> */}
          <Label>{data.designation}</Label>
        </PraticeLabel>
        {/* <Duration>
                    <ClockIcon>
                        <Clock className="las la-clock"></Clock>
                    </ClockIcon>
                    <ClockLabel>{data.duration}</ClockLabel>
                </Duration> */}
      </ContentArea>
    </Container>
  );
};

export default NextPractice;

const LockedContainer = styled.div`
  cursor: not-allowed;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  border-radius: 20px;
  padding: 21px;
  position: relative;
  margin-top: 20px;
  @media all and (max-width: 640px) {
    padding: 15px;
  }
  &:before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 50;
    background: rgba(255, 255, 255, 0.5);
  }
`;
const Container = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  border-radius: 20px;
  padding: 21px;
  @media all and (max-width: 640px) {
    padding: 15px;
  }
`;
const ImageContainer = styled.div`
  margin-right: 20px;
  width: 40%;
  min-width: 200px;
  border-radius: 7px;
  overflow: hidden;
  @media all and (max-width: 640px) {
    width: 100%;
    margin-bottom: 30px;
    margin-right: 0;
  }
`;
const Image = styled.img`
  display: block;
  width: 100%;
`;
const ContentArea = styled.div`
  width: 55%;
  @media all and (max-width: 640px) {
    width: 100%;
  }
`;
const ContentTitle = styled.h3`
  font-family: gordita_medium;
  font-size: 18px;
  margin-bottom: 10px;
  color: #4d4d4d;
`;
const HighLight = styled.span`
  display: inline-block;
  color: #41ae76;
  font-family: gordita_medium;
`;
const PraticeLabel = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  @media all and (max-width: 640px) {
    margin-top: 0px;
  }
`;
const Label = styled.span`
  display: block;
  color: #a8a8a8;
  font-size: 16px;
`;
const Icon = styled.small`
  display: inline-block;
  color: #a8a8a8;
  margin-right: 5px;
`;
const Clock = styled.i`
  font-size: 20px;
`;
const Layer = styled.i`
  font-size: 20px;
`;
const Duration = styled.div`
  display: flex;
  align-items: center;
`;
const ClockIcon = styled.small`
  display: inline-block;
  color: #a8a8a8;
  margin-right: 5px;
`;
const ClockLabel = styled.span`
  display: block;
  color: #a8a8a8;
  font-size: 16px;
`;
