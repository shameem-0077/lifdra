import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { secondsTohms } from "../../../../../../helpers/functions";

export default function WorkshopActivity({ data, subject_slug }) {
  const userSubscriptionType = useSelector(
    (state) => state.userSubscriptionType
  );
  const user_profile = useSelector((state) => state.user_profile);

  return userSubscriptionType === "trial_end" ||
    userSubscriptionType === "expired_subscription" ? (
    <LockedWorkshopCardContainer className="anim-fade">
      <VideoWrapper>
        <VideoImage src={data.image} alt="" />
        <Lock>
          <LockIcon src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/padlock.svg" />
        </Lock>
      </VideoWrapper>
      <WorkshopCardContent>
        <Title>Current Activity - Workshop</Title>
        <Description>
          <Number>#{data.order_id}</Number> | {data.title}
        </Description>
        <BottomIcons>
          <Designation>
            <Span>
              <i class="lar la-play-circle"></i>
            </Span>
            <Name>{data.designation}</Name>
          </Designation>
          <Duration>
            <Span>
              <i class="lar la-play-circle"></i>
            </Span>
            <Name>{secondsTohms(data.duration)}</Name>
          </Duration>
        </BottomIcons>
      </WorkshopCardContent>
      <NextActivityBackgroundImage1
        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/dashboard/top-left-oval.svg"
        alt=""
      />
      <NextActivityBackgroundImage2
        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/dashboard/ring.svg"
        alt=""
      />
      <NextActivityBackgroundImage3
        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/dashboard/bottom-right-oval.svg"
        alt=""
      />
    </LockedWorkshopCardContainer>
  ) : (
    <WorkshopCardContainer
      className="anim-fade"
      to={`/nanodegree/${subject_slug}/workshops/view/${data.id}/`}
    >
      <VideoWrapper>
        <VideoImage src={data.image} alt="" />
        <PlayButton className="las la-play-circle"></PlayButton>
      </VideoWrapper>
      <WorkshopCardContent>
        <Title>Current Activity - Workshop</Title>
        <Description>
          <Number>#{data.order_id}</Number> | {data.title}
        </Description>
        <BottomIcons>
          <Designation>
            <Span>
              <i class="lar la-play-circle"></i>
            </Span>
            <Name>{data.designation}</Name>
          </Designation>
          <Duration>
            <Span>
              <i class="lar la-play-circle"></i>
            </Span>
            <Name>{secondsTohms(data.duration)}</Name>
          </Duration>
        </BottomIcons>
      </WorkshopCardContent>
      <NextActivityBackgroundImage1
        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/dashboard/top-left-oval.svg"
        alt=""
      />
      <NextActivityBackgroundImage2
        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/dashboard/ring.svg"
        alt=""
      />
      <NextActivityBackgroundImage3
        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/dashboard/bottom-right-oval.svg"
        alt=""
      />
    </WorkshopCardContainer>
  );
}

const LockedWorkshopCardContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 30px;
  background-color: #e8fbf3;
  border-radius: 10px;
  position: relative;
  margin-bottom: 30px;
  @media all and (max-width: 768px) {
    flex-direction: column;
  }
  @media all and (max-width: 640px) {
    padding: 20px;
  }
  @media all and (max-width: 480px) {
    padding: 15px;
  }
`;
const WorkshopCardContainer = styled(Link)`
  display: flex;
  align-items: center;
  padding: 30px;
  background-color: #e8fbf3;
  border-radius: 10px;
  position: relative;
  margin-bottom: 30px;
  @media all and (max-width: 768px) {
    flex-direction: column;
  }
  @media all and (max-width: 640px) {
    padding: 20px;
  }
  @media all and (max-width: 480px) {
    padding: 15px;
  }
`;
const NextActivityBackgroundImage1 = styled.img`
  position: absolute;
  z-index: 0;
  width: 153px;
  height: 128px;
  top: 0;
  left: 0;
`;
const NextActivityBackgroundImage2 = styled.img`
  position: absolute;
  z-index: 0;
  width: 292px;
  height: 233px;
  top: 0;
  right: 0;
  @media all and (max-width: 480px) {
    display: none;
  }
`;
const NextActivityBackgroundImage3 = styled.img`
  position: absolute;
  width: 165px;
  height: 130px;
  bottom: 0;
  z-index: 0;
  right: 0;
`;

const VideoWrapper = styled.div`
  overflow: hidden;
  width: 47%;
  background-color: #163c53;
  border-radius: 5px;
  z-index: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
  }
  @media all and (max-width: 1280px) {
    width: 50%;
  }
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 25px;
  }
`;
const PlayButton = styled.span`
  display: block;
  color: #fff;
  font-size: 95px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media all and (max-width: 640px) {
  }
  @media all and (max-width: 480px) {
    font-size: 40px;
  }
`;
const VideoImage = styled.img`
  display: block;
  width: 100%;
`;
const WorkshopCardContent = styled.div`
  margin-left: 35px;
  width: 47%;
  @media all and (max-width: 768px) {
    margin-top: 17px;
    margin-left: 0px;
    width: 100%;
  }
`;
const Title = styled.span`
  font-family: "gordita_medium";
  display: block;
  line-height: 2.2rem;
  margin-bottom: 12px;
  font-size: 18px;
  color: #f9b23f;
  @media all and (max-width: 1100px) {
    margin-bottom: 4px;
  }
`;
const Description = styled.p`
  font-family: "baloo_paaji_2semibold";
  font-size: 20px;
  color: #000;
`;
const Number = styled.p`
  color: green;
  display: inline;
  font-family: "baloo_paaji_2semibold";
  font-size: 20px;
`;
const BottomIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  margin-top: 8px;
  font-size: 17px;
  @media all and (max-width: 1400px) {
    flex-wrap: wrap;
    margin-top: 5px;
  }
`;
const Designation = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
`;
const Span = styled.span`
  width: 14px;
  height: 23px;
  display: block;
  margin-right: 12px;
`;
const Name = styled.p`
  font-size: 19px;
`;
const Topics = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
`;
const Duration = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Lock = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  box-shadow: 0 16px 24px rgba(0, 0, 0, 0.1);
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 50%;
  z-index: 1;
`;
const LockIcon = styled.img`
  display: block;
  width: 21px !important;
`;
