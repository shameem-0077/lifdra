import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { secondsTohm } from "../../../../helpers/functions";
import ProgressiveImage from "react-progressive-image-loading";
import { useSelector } from "react-redux";

export default function ProfessionCard({ data, subject_slug }) {
  const userSubscriptionType = useSelector(
    (state) => state.userSubscriptionType
  );
  const user_profile = useSelector((state) => state.user_profile);

  return (userSubscriptionType !== "trial_end" ||
    userSubscriptionType !== "expired_subscription") &&
    data.status === "not_started" ? (
    <LockedContainer className="anim-fade" status={data.status}>
      <ImageContainer>
        <ProgressiveImage
          src={data.image}
          placeholder={data.image}
          render={(src) => <Image src={src} />}
        />
      </ImageContainer>
      <Right>
        <RightTop>
          <Id>
            #<span>{data.order_id}</span>
          </Id>
          <span className="line"></span>
          <Title>{data.name}</Title>
        </RightTop>
        <Bottom></Bottom>
      </Right>
      <LockIcon
        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/lock.svg"
        alt=""
      />
    </LockedContainer>
  ) : (userSubscriptionType === "trial_end" ||
      userSubscriptionType === "expired_subscription") &&
    data.status !== "not_started" ? (
    <SubscriptionLockedContainer status={data.status}>
      <ImageContainer>
        <ProgressiveImage
          src={data.image}
          placeholder={data.image}
          render={(src) => <Image src={src} />}
        />
      </ImageContainer>
      <Right>
        <RightTop>
          <Id>
            #<span>{data.order_id}</span>
          </Id>
          <span className="line"></span>
          <Title>{data.name}</Title>
        </RightTop>
        <Bottom></Bottom>
      </Right>
      <LockIcon
        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/lock.svg"
        alt=""
      />
    </SubscriptionLockedContainer>
  ) : (
    <Container
      className="anim-fade"
      status={data.status}
      to={`/nanodegree/${subject_slug}/professions/${data.id}/`}
    >
      <ImageContainer>
        <Image src={data.image} />
      </ImageContainer>
      <Right>
        <RightTop>
          <Id>
            #<span>{data.order_id}</span>
          </Id>
          <span className="line"></span>
          <Title>{data.name}</Title>
        </RightTop>
        <Bottom>
          {data.child_component_data && (
            <BottomItem>
              <Icon className="las la-layer-group"></Icon>
              <span>
                {data?.child_component_data?.count}{" "}
                {data?.child_component_data?.title}
              </span>
            </BottomItem>
          )}
          {data.videos_data && (
            <BottomItem>
              <Icon className="las la-clock"></Icon>
              <span>{data?.videos_data?.total_duration}</span>
            </BottomItem>
          )}
        </Bottom>
      </Right>
    </Container>
  );
}

const Container = styled(Link)`
  display: flex;
  align-items: center;
  padding: 19px;
  border-radius: 7px;
  background: #f9f9f9;
  position: relative;
  @media (max-width: 1024px) {
    display: block;
  }
  @media (max-width: 640px) {
    display: flex;
    padding: 14px;
  }
  @media (max-width: 480px) {
    display: block;
    padding: 0;
  }
  @media all and (max-width: 360px) {
    padding: 0;
  }
`;
const LockedContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 19px;
  border-radius: 7px;
  background: #f9f9f9;
  filter: grayscale(1);
  cursor: not-allowed;
  @media (max-width: 1024px) {
    display: block;
  }
  @media (max-width: 640px) {
    display: flex;
    padding: 14px;
  }
  @media (max-width: 480px) {
    display: block;
    padding: 17px;
  }
`;
const SubscriptionLockedContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 19px;
  border-radius: 7px;
  background: #f9f9f9;
  cursor: not-allowed;
  @media (max-width: 1024px) {
    display: block;
  }
  @media (max-width: 640px) {
    display: flex;
    padding: 14px;
  }
  @media (max-width: 480px) {
    display: block;
    padding: 17px;
  }
`;
const ImageContainer = styled.div`
  max-width: 160px;
  overflow: hidden;
  border-radius: 6px;
  margin-right: 14px;
  @media (max-width: 1024px) {
    max-width: 100%;
    margin-right: 0;
    margin-bottom: 14px;
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
  display: block;
  width: 100%;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
`;
const RightTop = styled.div`
  & span.line {
    display: none;
  }
  @media (max-width: 640px) {
    display: flex;
    align-items: center;
    & span.line {
      display: block;
      width: 1px;
      height: 18px;
      background: #a2a2a2;
      margin: 0 9px 0 6px;
    }
  }
`;
const LockIcon = styled.img`
  display: block;
  width: 15px;
  position: absolute;
  right: 17px;
  bottom: 17px;
`;
const Id = styled.h3`
  color: rgb(153, 153, 153);
  display: flex;
  align-items: center;
  font-family: gordita_regular;
  & span {
    color: rgb(63, 81, 181);
    font-size: 16px;
    margin-left: 4px;
  }
`;
const Title = styled.span`
  color: #424242;
  margin: 10px 0;
  font-family: gordita_regular;
  font-size: 14px;
  @media (max-width: 1024px) {
    margin: 7px 0;
  }
`;
const Bottom = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1024px) {
    display: block;
  }
  @media (max-width: 640px) {
    display: flex;
  }
  @media (max-width: 480px) {
    display: block;
  }
`;
const BottomItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
  font-family: gordita_regular;
  font-size: 12px;
  &:last-child {
    margin-right: 0px;
  }
  span {
    color: rgb(153, 153, 153);
    font-size: 12px;
  }
`;
const Icon = styled.i`
  color: rgb(76, 175, 80);
  font-size: 20px;
  margin-right: 6px;
`;
