import React from "react";
import styled from "styled-components";
import "aos/dist/aos.css";
import "../../../assets/css/web/style.css";
import bggradient from "../../../assets/images/web/color.png";

export default function AboutSpotlight() {
  const datas = [
    {
      id: 1,
      title: "Our Mission",
      content:
        "There are countless job opportunities in the engineering field, yet a significant number of graduates in our state remain unemployed. This disparity poses a barrier to potential innovations and developments in our society. One of the main reasons behind this is the gap between our academic curriculum and the industry requirements. Addressing this issue is crucial to increase the employability of our students and graduates. Steyp recognises the existing and upcoming job opportunities in the engineering field and is on a mission to tackle the unemployment hurdle by introducing a job-oriented education system that systematically prepares students to become engineers and future scientists.",
    },
    {
      id: 2,
      title: "Our Vision",
      content:
        "A job is a crucial aspect of one's identity, and a society where everyone has a job can be self-sufficient. The efficient utilisation of technology in all domains is the way forward in achieving this. Therefore, a job-oriented education system, integrated with technology, is an absolute necessity. Along with academic education, the younger generation should also develop job-oriented technical skill sets from a very young age. This can create more job opportunities and ensure that no qualified individual in our society goes without a job.",
    },
    {
      id: 3,
      title: "Our Values",
      content:
        "We believe that it is our responsibility to systematically guide each of our students towards their true potential and help them build a career in the technology field, rather than simply imparting theoretical knowledge. To ensure this, we have a fully-fledged team of engineers and mentors who provide individual attention to each student until they find their career path. Our commitment is to empower and restructure our educational system to accommodate new advancements in technology and to build a better, brighter future.",
    },
  ];

  return (
    <Container className="spotlight">
      <Left data-aos="fade-right">
        <ImageContainer className="second">
          <Image
            src={require("../../../assets/images/web/background-prime.png")}
            alt="back"
          />
        </ImageContainer>
        <Heading>About Us</Heading>
        {datas.map((item) => (
          <Contents>
            <Label>{item.title}</Label>
            <Content>{item.content}</Content>
          </Contents>
        ))}
      </Left>
      <Right data-aos="fade-left">
        <Heading className="responsivehead">About Us</Heading>
        <PremiumContainer>
          <LogoContainer>
            <LogoLink>
              <Logo
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/steyp-logo.svg"
                alt="Logo"
              />
            </LogoLink>
          </LogoContainer>
          <Premium>Creating Computer Engineers & Tech Scientists</Premium>
          <Content className="premium">
            Steyp Private Limited is an EdTech company and the beginning of the
            Digital University for Industry 4.0, where one can find relevant
            courses to upgrade their skills from top experts and gear up for
            Industry 4.0. Steyp is an initiative from Talrop.
          </Content>
          <SocialMedia>
            <SocialLinks
              target="_blank"
              href="https://www.instagram.com/steypworld/"
            >
              <img
                className="prime
                                "
                src={
                  "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/instagram-color.svg"
                }
                alt=""
              />
              <img
                className="secondry"
                src={
                  "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/instagram.svg"
                }
                alt=""
              />
            </SocialLinks>
            <SocialLinks
              target="_blank"
              href="https://www.facebook.com/steypworld/"
            >
              <img
                className="prime"
                src={
                  "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/facebook-color.svg"
                }
                alt=""
              />
              <img
                className="secondry"
                src={
                  "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/facebook.svg"
                }
                alt=""
              />
            </SocialLinks>
            <SocialLinks target="_blank" href="https://twitter.com/steypworld/">
              <img
                className="prime"
                src={
                  "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/twitterx-black.svg"
                }
                alt=""
              />
              <img
                className="secondry"
                src={
                  "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/twitterx.svg"
                }
                alt=""
              />
            </SocialLinks>
            <SocialLinks
              target="_blank"
              href="https://www.linkedin.com/company/steyp/"
            >
              <img
                className="prime"
                src={
                  "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/linkedin-color.svg"
                }
                alt=""
              />
              <img
                className="secondry"
                src={
                  "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/linkedin.svg"
                }
                alt=""
              />
            </SocialLinks>
            <SocialLinks
              target="_blank"
              href="https://www.youtube.com/c/steyp/"
            >
              <img
                className="prime"
                src={
                  "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/youtube-color.svg"
                }
                alt=""
              />
              <img
                className="secondry"
                src={
                  "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/youtube.svg"
                }
                alt=""
              />
            </SocialLinks>
          </SocialMedia>
        </PremiumContainer>
      </Right>
    </Container>
  );
}
const Container = styled.div`
  padding-top: 114px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 100px;
  @media all and (max-width: 980px) {
    flex-direction: column-reverse;
  }
  @media all and (max-width: 768px) {
    padding-top: 95px;
    margin-bottom: 45px;
  }
`;
const Left = styled.div`
  position: relative;
  width: 49%;
  @media all and (max-width: 980px) {
    width: 100%;
  }
`;
const ImageContainer = styled.div`
  &.second {
    z-index: -1;
    position: absolute;
    width: 235px;
    left: -94px;
    top: 510px;
    @media all and (max-width: 1300px) {
      top: 500px;
    }
    @media all and (max-width: 1100px) {
      top: 560px;
    }
    @media all and (max-width: 980px) {
      display: none;
    }
  }
`;
const Image = styled.img`
  width: 100%;
  display: block;
`;

const Heading = styled.h2`
  margin-top: 84px;
  font-size: 36px;
  font-family: gordita_medium;
  color: #212121;
  position: relative;
  margin-bottom: 80px;

  &.responsivehead {
    display: none;
    @media all and (max-width: 980px) {
      display: block;
    }
    @media all and (max-width: 768px) {
      margin-top: 35px;
    }
    @media all and (max-width: 480px) {
      font-size: 26px;
    }
  }
  &::before {
    content: "";
    position: absolute;
    top: -110px;
    left: -100px;
    width: 300px;
    height: 300px;
    background: url(${bggradient}) no-repeat;
    background-size: contain;
    display: block;
    z-index: -1;
    @media all and (max-width: 768px) {
      top: -69px;
      left: -42px;
      width: 300px;
      height: 200px;
    }
  }
  @media all and (max-width: 980px) {
    display: none;
  }
  @media all and (max-width: 480px) {
    font-size: 26px;
  }
  @media all and (max-width: 640px) {
    margin-bottom: 40px;
  }
`;
const Breadcrumb = styled.div`
  display: flex;
  letter-spacing: 0.01rem;
  color: #868686;
  line-height: 1.8;
  font-size: 15px;
  margin-bottom: 80px;
  font-family: "gordita_regular";
  span {
    margin-left: 5px;
  }
  &.responsivehead {
    display: none;
    @media all and (max-width: 980px) {
      display: block;
    }
  }
  @media all and (max-width: 980px) {
    display: none;
  }
  @media all and (max-width: 640px) {
    margin-bottom: 40px;
  }
  @media all and (max-width: 480px) {
    font-size: 13px;
  }
`;
const Contents = styled.div`
  margin-bottom: 63px;
  &:last-child {
    margin-bottom: 0px;
  }
  @media all and (max-width: 480px) {
    margin-bottom: 25px;
  }
`;
const Label = styled.div`
  margin-bottom: 10px;
  font-family: "gordita_medium";
  font-size: 20px;
  @media all and (max-width: 480px) {
    font-size: 15px;
  }
`;
const Content = styled.p`
  line-height: 1.8em;
  font-size: 15px;
  color: #757474;
  font-family: gordita_regular;
  &.premium {
    font-size: 14px;
    margin-top: 12px;
    @media all and (max-width: 480px) {
      font-size: 13px;
    }
  }
  @media all and (max-width: 480px) {
    font-size: 13px;
  }
`;
const Url = styled.a`
  display: inline-block;
  color: #42987d;
  line-height: 1.8em;
  font-family: gordita_regular;
`;
const Right = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  width: 40%;
  @media all and (max-width: 980px) {
    width: 100%;
    align-items: center;
    margin-bottom: 60px;
  }
`;
const PremiumContainer = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 113px;
  width: 359px;
  padding: 24px;
  border: 2.5px solid #f3f0f0;
  background: #fff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media all and (max-width: 1100px) {
    width: 344px;
  }
  @media all and (max-width: 980px) {
    width: 100%;
  }
  @media all and (max-width: 480px) {
    padding: 24px 12px;
  }
`;
const LogoContainer = styled.h1``;
const LogoLink = styled.a`
  width: 120px;
  display: block;
  @media all and (max-width: 1100px) {
    width: 90px;
  }
`;
const Logo = styled.img`
  width: 100%;
  display: block;
`;
const Premium = styled.div`
  display: flex;
  font-size: 15px;
  font-family: "gordita_medium";
  margin-top: 20px;
  &:before {
    content: "";
    width: 4px;
    height: 20px;
    background: #1bca1b;
    margin-right: 5px;
  }
  @media all and (max-width: 480px) {
    font-size: 14px;
  }
`;
const SocialMedia = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 162px;
  @media all and (max-width: 420px) {
    width: 145px;
  }
`;
const SocialLinks = styled.a`
  display: block;
  margin-right: 15px;
  height: 20px;
  .prime {
    display: none;
  }
  &:hover {
    .prime {
      display: block;
    }
    .secondry {
      display: none;
    }
  }

  img {
    display: block;
    height: 100%;
  }
  &:last-child {
    margin-right: 0;
  }
  @media all and (max-width: 1100px) {
    height: 16px;
  }
  @media all and (max-width: 640px) {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
`;
const SocialLink = styled.a`
  display: block;
  margin-right: 12px;
  img {
    display: block;
    width: 100%;
    &:hover {
      filter: invert(27%) sepia(51%) saturate(2878%) hue-rotate(181deg)
        brightness(104%) contrast(97%);
    }
    &.insta:hover {
      filter: invert(27%) sepia(51%) saturate(2878%) hue-rotate(320deg)
        brightness(104%) contrast(97%);
    }
    &.lasting:hover {
      filter: invert(27%) sepia(51%) saturate(2878%) hue-rotate(320deg)
        brightness(104%) contrast(97%);
    }
  }
  &:last-child {
    margin-right: 0;
    transform: translateY(1px);
  }
`;
