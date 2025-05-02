import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ArrowRight from "../../../../assets/images/school-scientist/Arrow-steyp.svg";

function Mission() {
  return (
    <ContainerCover>
      <Cover className="wrapper">
        <Left>
          <Top>
            <LogoImage>
              <img
                src={
                  "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/steyp-logo.svg"
                }
                alt=""
              />
            </LogoImage>
            <Heading>on a mission to build Engineers & Scientists</Heading>
          </Top>
          <Bottom>
            <Para>
              Steyp is building a Digital University for students to learn and
              become Engineers and Future Scientists irrespective of their age
              or educational background. Students can now learn technology along
              with their school/college studies.
            </Para>
            <Para style={{ marginBottom: "0" }}>
              Steyp offers programmes for school students from 5-12, college
              students and dropouts. A student has to spend only a minimum of 1
              hour a day to achieve their goal of becoming a software engineer.
              Students can now secure their career with the technology education
              that Steyp Provides.
            </Para>
          </Bottom>
          {/* <Link to="/" target="blank">
                    <ApplyButton>Start free trial!</ApplyButton>
                </Link> */}
          <BottomSection

          // to={
          //     school_scientist_data.is_verified &&
          //     school_scientist_data.exam_status ===
          //         "pending" &&
          //     today === "29-01-2023"
          //         ? "/school-scientist/exam/start/"
          //         : school_scientist_data.is_verified &&
          //           school_scientist_data.exam_status ===
          //               "attending" &&
          //           today === "29-01-2023"
          //         ? "/school-scientist/exam/questions/"
          //         : "/school-scientist/apply/"
          // }
          // className="btn-shine"
          >
            <Button to="/">
              Explore Steyp
              {/* {school_scientist_data.is_verified &&
                                school_scientist_data.exam_status ===
                                    "pending" &&
                                today === "29-01-2023"
                                    ? "Start Exam"
                                    : school_scientist_data.is_verified &&
                                      school_scientist_data.exam_status ===
                                          "attending" &&
                                      today === "29-01-2023"
                                    ? "Continue Exam"
                                    : "Register Now"} */}
            </Button>
            <ButtonImage>
              <img src={ArrowRight} alt="Arrow" />
            </ButtonImage>
          </BottomSection>
        </Left>
        <Right>
          <MammotyImage>
            <img
              src={require("../../../../assets/images/school-scientist/mammoty.svg")}
              alt=""
            />
          </MammotyImage>
        </Right>
      </Cover>
    </ContainerCover>
  );
}

export default Mission;
const BottomSection = styled.div`
  margin-top: 35px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 25%;
  padding: 5px 5px 5px 25px;
  background: linear-gradient(127.01deg, #0fa76f -9.18%, #0f9ea7 129.96%);
  color: #fff;
  border: 1px solid linear-gradient(127.01deg, #0fa76f -9.18%, #0f9ea7 129.96%);
  border-radius: 30px;
  cursor: pointer;
  ::before {
    display: inline-block;
  }
  @media all and (max-width: 1500px) {
    width: 30%;
  }
  @media all and (max-width: 1280px) {
    width: 37%;
  }
  @media all and (max-width: 1120px) {
    width: 39%;
  }
  @media all and (max-width: 1080px) {
    width: 44%;
  }
  @media all and (max-width: 980px) {
    width: 24%;
  }
  @media all and (max-width: 880px) {
    width: 26%;
  }
  @media all and (max-width: 800px) {
    width: 28%;
  }
  @media all and (max-width: 768px) {
    width: 30%;
  }
  @media all and (max-width: 700px) {
    width: 34%;
  }
  @media all and (max-width: 640px) {
    width: 38%;
  }
  @media all and (max-width: 560px) {
    width: 42%;
  }
  @media all and (max-width: 480px) {
    width: 47%;
  }
  @media all and (max-width: 410px) {
    width: 54%;
  }
  @media all and (max-width: 360px) {
    width: 56%;
    padding: 4px 4px 4px 20px;
  }
  @media all and (max-width: 340px) {
    width: 60%;
    padding: 4px 4px 4px 20px;
  }
`;
const Button = styled(Link)`
  display: inline-block;
  color: #fff;
  font-family: "gordita_medium";
  font-size: 16px;
  cursor: pointer;
  @media all and (max-width: 640px) {
    font-size: 15px;
  }
  @media all and (max-width: 480px) {
    font-size: 14px;
  }
`;
const ButtonImage = styled.div`
  width: 35px;
  height: 35px;
  cursor: pointer;
  padding: 13px;
  align-items: center;
  display: flex;
  justify-content: center;
  background: #fff;
  border-radius: 50%;
  img {
    width: 100%;
    display: block;
  }
`;
const ContainerCover = styled.section`
  background-color: #f1faf5;
`;
const Cover = styled.div`
  padding: 90px 0px;
  display: flex;
  justify-content: space-between;
  @media all and (max-width: 1080px) {
    align-items: center;
  }
  @media all and (max-width: 980px) {
    padding: 60px 0px;
    padding-bottom: 0px;
  }
  @media all and (max-width: 480px) {
    padding-top: 40px;
    padding-bottom: 40px;
  }
`;
const Left = styled.div`
  padding-top: 80px;
  width: 58%;
  @media all and (max-width: 1280px) {
    width: 60%;
  }
  @media all and (max-width: 1080px) {
    width: 65%;
  }
  @media all and (max-width: 980px) {
    width: 100%;
    padding-top: 40px;
  }
  @media all and (max-width: 640px) {
    padding-top: 0;
  }
`;
const Top = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 50px;
  @media all and (max-width: 1280px) {
    margin-bottom: 35px;
  }
  @media all and (max-width: 640px) {
    display: block;
  }
  @media all and (max-width: 480px) {
    margin-bottom: 15px;
  }
`;
const LogoImage = styled.div`
  width: 17%;
  margin-right: 10px;
  img {
    width: 100%;
    display: block;
  }
  @media all and (max-width: 480px) {
    width: 30%;
    margin-bottom: 10px;
  }
`;
const Heading = styled.h3`
  font-size: 28px;
  font-family: "gordita_medium" !important;
  @media all and (max-width: 1380px) {
    font-size: 24px;
  }
  @media all and (max-width: 1280px) {
    font-size: 21px;
  }
`;
const Bottom = styled.div``;
const Para = styled.p`
  width: 90%;
  font-size: 16px;
  margin-bottom: 20px;
  @media all and (max-width: 1280px) {
    font-size: 15px;
  }
  @media all and (max-width: 980px) {
    width: 95%;
  }
  @media all and (max-width: 480px) {
    margin-bottom: 10px;
    width: 100%;
  }
`;
const Right = styled.div`
  width: 35%;
  @media all and (max-width: 1280px) {
    width: 40%;
  }
  @media all and (max-width: 1080px) {
    width: 35%;
  }
  @media all and (max-width: 980px) {
    display: none;
  }
`;
const MammotyImage = styled.div`
  width: 100%;
  img {
    width: 100%;
    display: block;
  }
`;
const ApplyButton = styled.button`
  margin-top: 35px;
  width: 180px;
  height: 50px;
  color: #fff;
  display: flex;
  font-family: gordita_medium;
  font-size: 16px;
  justify-content: center;
  align-items: center;
  background: linear-gradient(127.01deg, #0fa76f -9.18%, #0f9ea7 129.96%);
  border-radius: 6px;
  transition: all 0.4s ease;
  position: relative;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
  &.responsive {
    display: none;
    margin: 90px auto 0;
  }
`;
