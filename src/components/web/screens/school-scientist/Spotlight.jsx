import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Background from "../../../../assets/images/school-scientist/background.png";
import ArrowRight from "../../../../assets/images/school-scientist/arrow-right.svg";
import "../../../../assets/css/web.css";
import OtpModal from "../../inludes/steyp-landing-page/school-scientist/OtpModal";
import SuccessModal from "../../inludes/steyp-landing-page/school-scientist/SuccessModal";
import $ from "jquery";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import RegistarationModal from "../../../learn/includes/school-scientiest/modals/RegistarationModal";

function Spotlight({
  detailModal,
  setProgarm,
  program,
  setOtpModal,
  isOtpModal,
  viewPhone,
  setSuccessModal,
  successModal,
  today,
}) {
  useEffect(() => {
    if (detailModal) {
      $("html").addClass("modal-enabled");
    } else {
      $("html").removeClass("modal-enabled");
    }
  }, [detailModal]);
  const history = useHistory();
  const { greenovation_scholarship_exam_data } = useSelector((state) => state);

  return (
    <Cover>
      <RegistarationModal program={program} setProgarm={setProgarm} />
      <OtpModal
        isOtpModal={isOtpModal}
        setOtpModal={setOtpModal}
        viewPhone={viewPhone}
        setSuccessModal={setSuccessModal}
      />
      <SuccessModal
        successModal={successModal}
        setSuccessModal={setSuccessModal}
      />
      <WrapperContainer className="wrapper">
        <SubContainer>
          <Left>
            <HeadContainer>
              <GropImage>
                <img
                  src={require("../../../../assets/images/school-scientist/nss-logo.svg")}
                  alt="Group"
                />
              </GropImage>
              <Content>
                <GreenSen>NATIONAL SERVICE SCHEME</GreenSen>
                <District>THRISSUR DISTRICT</District>
                {/* <hr /> */}
                {/* <span>Organizing</span> */}
              </Content>
              <small>&</small>
              <SteypLogo>
                <img
                  src={
                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/steyp-logo.svg"
                  }
                  alt="Logo"
                />
              </SteypLogo>
            </HeadContainer>
            <LogoContainer>
              <img
                src={
                  "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-05-2023/greenovation-logo.png"
                }
                alt="Logo"
              />
            </LogoContainer>
            <MiddleSection>
              <Para>
                We are on the lookout for Kerala’s most promising young students
                to help them develop their talents along with their schooling.
                We encourage interested students to participate in this event!
                Take a chance to win exciting prizes.
              </Para>
              <Place>
                <Small>
                  For <span></span> Students of <Span>Thrissur</Span>
                </Small>
              </Place>
            </MiddleSection>
            <ButtonContainer>
              {today >= "2023-06-04T00:00:00" &&
                today <= "2023-06-05T00:00:00" && (
                  <Attend to="/greenovation/exam/start">
                    <Button>
                      {greenovation_scholarship_exam_data?.exam_status ===
                      "attending"
                        ? "Continue Exam"
                        : "Start Exam"}
                    </Button>
                    <ButtonImage>
                      <img src={ArrowRight} alt="Arrow" />
                    </ButtonImage>
                  </Attend>
                )}

              <BottomSection onClick={() => setProgarm(true)}>
                <Button>Register Now</Button>
                <ButtonImage>
                  <img src={ArrowRight} alt="Arrow" />
                </ButtonImage>
              </BottomSection>
            </ButtonContainer>
          </Left>
          <Right>
            <HeroContainer></HeroContainer>
          </Right>
        </SubContainer>
      </WrapperContainer>
    </Cover>
  );
}

export default Spotlight;
const HeroContainer = styled.div`
  background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-05-2023/hero.png");
  background-repeat: no-repeat;
  background-size: contain;
  height: 422px;
  width: 100%;
  @media all and (max-width: 480px) {
    height: 310px;
  }
`;
const Cover = styled.div`
  padding: 120px 0;
  background-image: url(${Background});
  background-repeat: no-repeat;
  position: relative;
  background-size: cover;
  @media all and (max-width: 1280px) {
    padding: 90px 0;
  }
  @media all and (max-width: 1080px) {
    padding: 60px 0;
  }
  @media all and (max-width: 480px) {
    padding: 40px 0px;
  }

  ::after {
    content: "";
    display: inline-block;
    background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/09-01-2023/cloud-image.svg");
    background-repeat: no-repeat;
    width: 220px;
    height: 122px;
    position: absolute;
    bottom: -5%;
    /* right: 13%; */
    left: 6%;
    z-index: 2;
    background-size: 100%;
    @media all and (max-width: 1380px) {
      background-size: 80%;
      bottom: -8%;
      right: -2%;
    }
    @media all and (max-width: 1080px) {
      background-size: 70%;
      bottom: -12%;
    }
    @media all and (max-width: 980px) {
      background-size: 70%;
      bottom: -6%;
    }
    @media all and (max-width: 768px) {
      background-size: 70%;
    }
    @media all and (max-width: 640px) {
      display: none;
    }
  }
`;
const WrapperContainer = styled.div`
  @media all and (max-width: 400px) {
    width: 95% !important;
  }
`;
const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding-top: 50px;
  @media all and (max-width: 980px) {
    flex-wrap: wrap;
  }
  @media all and (max-width: 320px) {
    padding-top: 0;
  }
`;
const Left = styled.div`
  width: 56%;
  @media all and (max-width: 1280px) {
    width: 50%;
  }
  @media all and (max-width: 980px) {
    width: 100%;
    margin-bottom: 30px;
  }
`;
const HeadContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 15px 25px;
  margin-bottom: 40px;
  border-radius: 15px;
  @media all and (max-width: 1280px) {
    width: 82%;
  }
  @media all and (max-width: 1080px) {
    padding: 10px 20px;
    margin-bottom: 35px;
  }
  @media all and (max-width: 980px) {
    width: 60%;
  }
  @media all and (max-width: 768px) {
    width: 66%;
  }
  @media all and (max-width: 640px) {
    width: 90%;
  }
  @media all and (max-width: 480px) {
    width: 100%;
    margin-bottom: 25px;
    padding: 15px 10px;
  }
  small {
    font-size: 18px;
    @media all and (max-width: 480px) {
      font-size: 16px;
    }
  }
`;
const GropImage = styled.div`
  width: 15%;
  img {
    width: 100%;
    display: block;
  }
  @media all and (max-width: 480px) {
    width: 12%;
    margin-right: 10px;
  }
`;
const Content = styled.div`
  hr {
    width: 105px;
    height: 1px;
    background-color: #000;
    display: inline-block;
    @media all and (max-width: 1080px) {
      width: 95px;
    }
  }
  span {
    @media all and (max-width: 1280px) {
      font-size: 12px;
    }
  }
`;
const GreenSen = styled.p`
  color: #08884d;
  font-family: "gordita_medium" !important;
  font-size: 14px;
  @media all and (max-width: 1380px) {
    font-size: 13px;
  }
  @media all and (max-width: 1280px) {
    font-size: 12px;
  }
  @media all and (max-width: 360px) {
    font-size: 11px;
  }
`;
const District = styled.p`
  font-family: "gordita_medium" !important;
  color: #000;
  @media all and (max-width: 1280px) {
    font-size: 12px;
  }
`;
const SteypLogo = styled.div`
  width: 25%;
  img {
    width: 100%;
    display: block;
  }
  @media all and (max-width: 480px) {
    width: 20%;
  }
`;
const LogoContainer = styled.div`
  width: 60%;
  margin-bottom: 30px;
  position: relative;
  @media all and (max-width: 1280px) {
    margin-bottom: 25px;
  }
  @media all and (max-width: 640px) {
    width: 70%;
  }
  @media all and (max-width: 480px) {
    width: 100%;
    margin-bottom: 25px;
  }
  ::after {
    display: inline-block;
    content: "";
    background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/05-01-2023/plain.svg");
    width: 173px;
    height: 142px;
    position: absolute;
    background-repeat: no-repeat;
    top: -42px;
    right: -200px;
    @media all and (max-width: 1380px) {
      background-size: 90%;
    }
    @media all and (max-width: 1280px) {
      background-size: 74%;
      top: -32%;
    }
    @media all and (max-width: 1080px) {
      background-size: 60%;
      top: -48%;
    }
    @media all and (max-width: 980px) {
      background-size: 80%;
      top: -27%;
    }
    @media all and (max-width: 768px) {
      background-size: 70%;
      top: -30%;
    }
    @media all and (max-width: 640px) {
      display: none;
    }
  }
  img {
    width: 100%;
    display: block;
  }
`;
const MiddleSection = styled.div`
  margin-bottom: 60px;
  @media all and (max-width: 640px) {
    margin-bottom: 25px;
  }
`;
const Para = styled.p`
  color: #fff;
  margin-bottom: 35px;
  font-size: 16px;
  width: 88%;
  text-align: justify;
  @media all and (max-width: 1280px) {
    width: 100%;
    font-size: 15px;
  }
  @media all and (max-width: 980px) {
    width: 84%;
  }
  @media all and (max-width: 640px) {
    width: 96%;
  }
  @media all and (max-width: 480px) {
    width: 100%;
    margin-bottom: 25px;
  }
`;
const Place = styled.div`
  margin-bottom: 35px;
  @media all and (max-width: 680px) {
    margin-bottom: 0px;
  }
`;
const Small = styled.p`
  font-size: 16px;
  font-family: "gordita_medium" !important;
  color: #fff;
  position: relative;
  @media all and (max-width: 1080px) {
    font-size: 15px;
  }
  @media all and (max-width: 480px) {
    font-size: 14px;
  }
  ::after {
    content: "";
    background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/02-01-2023/bend-line.svg");
    background-repeat: no-repeat;
    display: inline-block;
    width: 190px;
    position: absolute;
    left: 4%;
    height: 10px;
    top: 96%;
    @media all and (max-width: 480px) {
      display: none;
    }
  }

  span {
    font-family: "gordita_medium" !important;
    color: #ffde2e;
    font-size: 20px;
    @media all and (max-width: 480px) {
      font-size: 16px;
    }
  }
`;
const Span = styled.span`
  font-family: "gordita_medium" !important;
  color: #ffde2e;
  position: relative;
`;
const BottomSection = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 25%;
  padding: 5px 5px 5px 25px;
  background-color: #e7be15;
  color: #fff;
  border: 1px solid #e7be15;
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
    width: 55%;
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
  ::before {
    content: "";
    position: absolute;
    background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/02-01-2023/Vector.svg");
    background-repeat: no-repeat;
    right: -77%;
    width: 100px;
    background-size: 70%;
    top: -11%;
    height: 100px;
    cursor: auto;

    @media all and (max-width: 1080px) {
      background-size: 70%;
      right: -80%;
    }
    @media all and (max-width: 980px) {
      background-size: 70%;
      right: -81%;
    }
    @media all and (max-width: 640px) {
      right: -82%;
    }
    @media all and (max-width: 480px) {
      display: none;
    }
  }
`;
const Button = styled.button`
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
const Right = styled.div`
  width: 45%;
  position: relative;
  @media all and (max-width: 1380px) {
    width: 42%;
  }
  @media all and (max-width: 1280px) {
    width: 45%;
  }
  @media all and (max-width: 980px) {
    width: 68%;
    margin: 0 auto;
  }
  @media all and (max-width: 900px) {
    width: 71%;
    margin: 0 auto;
  }
  @media all and (max-width: 800px) {
    width: 81%;
  }
  @media all and (max-width: 700px) {
    width: 94%;
  }
  @media all and (max-width: 600px) {
    width: 100%;
  }
`;
const MentorContainer = styled.div`
  margin-bottom: 20px;
  @media all and (max-width: 980px) {
    display: block;
    margin: 0 auto 20px;
  }
  img {
    width: 100%;
    display: block;
  }
`;
const DateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 14px 19px;
  border-radius: 12px;
  width: 95%;
  @media all and (max-width: 1560px) {
    width: 100%;
  }
  @media all and (max-width: 980px) {
    width: 90%;
    margin: 0 auto;
  }
  @media all and (max-width: 850px) {
    width: 95%;
    margin: 0 auto;
  }
  @media all and (max-width: 600px) {
    width: 100%;
  }
  @media all and (max-width: 480px) {
    padding: 10px 10px;
  }
`;
const ImageCalendar = styled.div`
  margin-right: 15px;
  width: 20px;
  @media all and (max-width: 480px) {
    margin-right: 10px;
  }
  img {
    width: 100%;
    display: block;
  }
`;
const Date = styled.h6`
  font-family: "gordita_medium";
  color: #747474;
  font-size: 1rem;
  line-height: 18px;
  margin-top: 6px;
  @media all and (max-width: 1160px) {
    font-size: 0.9em;
  }
  @media all and (max-width: 1080px) {
    font-size: 0.8em;
  }
  @media all and (max-width: 980px) {
    font-size: 1em;
  }
  @media all and (max-width: 540px) {
    font-size: 0.9em;
  }
  @media all and (max-width: 480px) {
    font-size: 0.8em;
  }
`;
const SpanDate = styled.span`
  display: inline-block;
  font-family: "gordita_medium";
  line-height: 18px;
  color: #e7be15;
  font-size: 1.2rem;
  @media all and (max-width: 1160px) {
    font-size: 1em;
  }
  @media all and (max-width: 1080px) {
    font-size: 1em;
  }
  @media all and (max-width: 1080px) {
    font-size: 1.1em;
  }
  @media all and (max-width: 540px) {
    font-size: 1em;
  }
  @media all and (max-width: 480px) {
    font-size: 0.9em;
  }
`;
const ButtonContainer = styled.div`
  display: flex;

  @media all and (max-width: 480px) {
    flex-wrap: wrap;
  }
`;
const Attend = styled(Link)`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 25%;
  padding: 5px 5px 5px 25px;
  background-color: #e7be15;
  color: #fff;
  border: 1px solid #e7be15;
  border-radius: 30px;
  cursor: pointer;
  margin: 0 10px 0 0;

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
    width: 55%;
    margin: 0 0 10px 0;
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
  ::before {
    content: "";
    position: absolute;
    background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/02-01-2023/Vector.svg");
    background-repeat: no-repeat;
    right: -77%;
    width: 100px;
    background-size: 70%;
    top: -11%;
    height: 100px;
    cursor: auto;

    @media all and (max-width: 1080px) {
      background-size: 70%;
      right: -80%;
    }
    @media all and (max-width: 980px) {
      background-size: 70%;
      right: -81%;
    }
    @media all and (max-width: 640px) {
      right: -82%;
    }
    @media all and (max-width: 480px) {
      display: none;
    }
  }
`;
