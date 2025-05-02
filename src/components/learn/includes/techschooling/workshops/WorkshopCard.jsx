import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { secondsTohm } from "../../../../helpers/functions";
import { useSelector } from "react-redux";

const WorkshopCard = ({ data, subject_slug }) => {
  const userSubscriptionType = useSelector(
    (state) => state.userSubscriptionType
  );

  return userSubscriptionType === "trial_end" ||
    userSubscriptionType === "expired_subscription" ? (
    <LockedCard className="anim-fade">
      <CardImgContainer>
        <CardImg src={data.image} alt="Image" />
      </CardImgContainer>
      <NextContent>
        <NextContentTop>
          <NextContentTopSpan>#{data.auto_id}</NextContentTopSpan>
          <MidSpan>|</MidSpan>
          {data.title}
        </NextContentTop>
        <NextContentBottomAssets>
          <NextContentBottomAsset>
            <Icon className="las la-layer-group"></Icon>
            <IconContent>{data.designation}</IconContent>
          </NextContentBottomAsset>
          <NextContentBottomAsset>
            <Icon className="las la-play-circle"></Icon>
            <IconContent>
              {data.topic_count === 1
                ? "1 Topic"
                : `${data.topic_count} Topics`}
            </IconContent>
          </NextContentBottomAsset>
          <NextContentBottomAsset>
            <Icon className="las la-play-circle"></Icon>
            <IconContent>{secondsTohm(data.duration)}</IconContent>
          </NextContentBottomAsset>
        </NextContentBottomAssets>
      </NextContent>
      <LockIcon className="las la-lock"></LockIcon>
    </LockedCard>
  ) : (
    <Card
      className="anim-fade"
      to={`/nanodegree/${subject_slug}/workshops/view/${data.current_topic}/`}
    >
      <CardImgContainer>
        <CardImg src={data.image} alt="Image" />
      </CardImgContainer>
      {/* <h1>{data.professions_pk}</h1> */}
      <NextContent>
        <NextContentTop>
          <NextContentTopSpan>#{data.auto_id}</NextContentTopSpan>
          <MidSpan>|</MidSpan>
          {data.title}
        </NextContentTop>
        <NextContentBottomAssets>
          <NextContentBottomAsset>
            <Icon className="las la-layer-group"></Icon>
            <IconContent>{data.designation}</IconContent>
          </NextContentBottomAsset>
          <NextContentBottomAsset>
            <Icon className="las la-play-circle"></Icon>
            <IconContent>
              {data.topic_count === 1
                ? "1 Topic"
                : `${data.topic_count} Topics`}
            </IconContent>
          </NextContentBottomAsset>
          <NextContentBottomAsset>
            {/* <Icon className="las la-play-circle"></Icon>
						<IconContent>{secondsTohm(data.duration)}</IconContent> */}
          </NextContentBottomAsset>
        </NextContentBottomAssets>
      </NextContent>
    </Card>
  );
};
const Card = styled(Link)`
  padding: 0px 10px 0px 0px;
  display: flex;
  align-items: center;
  background: #f9f9fb;
  border-radius: 8px;
  width: 100%;
  &:first-child {
    margin-top: 0;
  }
  @media all and (max-width: 1280px) {
    /* padding: 12px; */
  }
  @media all and (max-width: 640px) {
    padding: 10px;
    flex-wrap: wrap;
    box-shadow: 0 16px 24px rgba(0, 0, 0, 0.1);
  }
`;
const LockedCard = styled.div`
  position: relative;
  cursor: not-allowed;
  padding: 20px;
  display: flex;
  align-items: center;
  background: #f9f9fb;
  border-radius: 8px;
  width: 100%;
  &:first-child {
    margin-top: 0;
  }
  @media all and (max-width: 1280px) {
    padding: 12px;
  }
  @media all and (max-width: 640px) {
    padding: 20px;
    flex-wrap: wrap;
    box-shadow: 0 16px 24px rgba(0, 0, 0, 0.1);
  }
  position: relative;

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
const LockIcon = styled.i`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 22px;
`;
const CardImgContainer = styled.div`
  min-width: 42%;
  max-width: 42%;
  overflow: hidden;
  border-radius: 6px;
  @media (max-width: 1280px) {
    min-width: 45%;
  }
  @media all and (max-width: 980px) {
    /* min-width: 42%; */
  }
  @media all and (max-width: 640px) {
    min-width: 100%;
    max-width: 100%;
    margin: 0;
    margin-bottom: 20px;
  }
`;
const CardImg = styled.img`
  width: 100%;
  display: block;
`;
const NextContent = styled.div`
  margin-left: 20px;
  @media all and (max-width: 640px) {
    /* margin-left: 0px; */
    margin-top: 20px;
  }
`;
const NextContentTop = styled.h3`
  color: #1e4e52;
  font-size: 16px;
  width: 100%;
  font-family: gordita_medium;
  @media all and (max-width: 1280px) {
    font-size: 16px;
  }
  @media all and (max-width: 1080px) {
    font-size: 14px;
  }
  @media all and (max-width: 980px) {
    font-size: 16px;
  }
  @media all and (max-width: 480px) {
    font-size: 16px;
  }
  @media all and (max-width: 360px) {
    font-size: 14px;
  }
`;
const NextContentTopSpan = styled.span`
  color: #49b27c;
  font-family: gordita_medium;
  font-size: 16px;
  @media all and (max-width: 1080px) {
    font-size: 14px;
  }
  @media all and (max-width: 980px) {
    font-size: 16px;
  }
  @media all and (max-width: 480px) {
    font-size: 16px;
  }
`;
const MidSpan = styled.span`
  color: #333333;
  font-family: gordita_medium;
  font-size: 18px;
  margin: 0 5px;
  @media all and (max-width: 1080px) {
    font-size: 16px;
  }
  @media all and (max-width: 980px) {
    font-size: 16px;
  }
`;
const NextContentBottomAssets = styled.ul`
  display: flex;
  align-items: center;
  margin-top: 15px;
  @media all and (max-width: 1280px) {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 8px;
  }
  @media all and (max-width: 980px) {
    margin-top: 8px;
  }
`;
const NextContentBottomAsset = styled.li`
  color: #9b9b9b;
  margin-right: 20px;
  display: flex;
  align-items: center;

  font-family: "baloo_paaji_2semibold";
  &:last-child {
    margin-right: 0px;
  }
  @media all and (max-width: 1280px) {
    margin-right: 8px;
  }
`;
const Icon = styled.i`
  color: #9b9b9b;
  font-size: 20px;
  margin-right: 5px;
  display: flex;
  align-items: center;
  transform: translateY(-3px);

  @media all and (max-width: 1280px) {
    font-size: 18px;
  }
  @media (max-width: 480px) {
    font-size: 15px;
  }
`;
const IconContent = styled.span`
  font-size: 12px;
  font-family: gordita_regular;
  @media all and (max-width: 1280px) {
    font-size: 12px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export default WorkshopCard;
