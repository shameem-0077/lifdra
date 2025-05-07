import React from "react";
import styled from "styled-components";
import arrow_right from "../../../assets/images/prime-explore/arrow-right.svg";
// import banner_illustration from "../../../../assets/images/prime-explore/banner-illustration.svg"; // Use your actual illustration asset

const SubscriptionBanner = () => {
  return (
    <BannerContainer>
      <BannerLeft>
        <BannerHeading>
          <span className="highlight">“</span>Enjoy The Benefits Of <span className="highlight">Our Subscription Offer</span><span className="highlight">”</span>
        </BannerHeading>
        <BannerDesc>
          Prime Program offers a wide range of courses to enhance your skills in different areas of Designs. <br />
          Grab our monthly subscription plan and get access to all of these courses.
        </BannerDesc>
        <BannerPrice>
          ₹2000 <span>/Month</span>
        </BannerPrice>
      </BannerLeft>
      <BannerRight>
        <BannerButton>
          Subscribe Now
        </BannerButton>
        <Arrow src={arrow_right} alt="Arrow" />
        {/* <BannerArt src={banner_illustration} alt="Banner Illustration" /> */}
        <Circle className="circle1" />
        <Circle className="circle2" />
      </BannerRight>
    </BannerContainer>
  );
};

export default SubscriptionBanner;

const BannerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #f3f3f3;
  padding: 32px 40px;
  margin-bottom: 32px;
  position: relative;
  min-height: 120px;
  overflow: hidden;
`;

const BannerLeft = styled.div`
  flex: 1 1 60%;
  z-index: 2;
`;

const BannerHeading = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 8px;
  .highlight {
    color: #a02060;
    font-size: 1.7rem;
    font-weight: 700;
  }
`;

const BannerDesc = styled.p`
  color: #6a6a6a;
  font-size: 1rem;
  margin-bottom: 16px;
`;

const BannerPrice = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 0;
  span {
    font-size: 1rem;
    color: #888;
    font-weight: 400;
    margin-left: 4px;
  }
`;

const BannerRight = styled.div`
  flex: 1 1 40%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  min-width: 320px;
  height: 100%;
`;

const BannerButton = styled.button`
  background: #111;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  padding: 14px 32px;
  cursor: pointer;
  margin-bottom: 16px;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  transition: background 0.2s;
  &:hover {
    background: #a02060;
  }
`;

const Arrow = styled.img`
  position: absolute;
  left: -60px;
  top: 50px;
  width: 80px;
  z-index: 1;
`;

const BannerArt = styled.img`
  position: absolute;
  right: 0;
  top: 0;
  width: 160px;
  z-index: 0;
`;

const Circle = styled.div`
  position: absolute;
  border-radius: 50%;
  background: #f8d6ee;
  opacity: 0.5;
  &.circle1 {
    width: 48px;
    height: 48px;
    right: 60px;
    top: 20px;
  }
  &.circle2 {
    width: 32px;
    height: 32px;
    right: 120px;
    bottom: 20px;
  }
`;
