import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import "../../../assets/css/web/style.css";
import bggradient from "../../../assets/images/web/color.png";
import { communityConfig } from "../../../axiosConfig";
import axios from "axios";

export default function Backborns() {
  const [ceo, setCeo] = useState("");
  const [coo, setCoo] = useState("");
  const [academicHead, setAcademicHead] = useState("");
  const [technologyHead, setTechnologyHead] = useState("");
  const [administrativeHead, setAdministrativeHead] = useState("");
  const [marketHead, setMarketHead] = useState("");
  const [relationHead, setRelationHead] = useState("");
  const [coordinator, setcoordinator] = useState("");

  useEffect(() => {
    const getTeam = () => {
      const axiosrequest1 = communityConfig.get(
        "/team/steyp-team-members/?priority=1"
      );
      const axiosrequest2 = communityConfig.get(
        "/team/steyp-team-members/?priority=2"
      );
      const axiosrequest3 = communityConfig.get(
        "/team/steyp-team-members/?priority=3"
      );
      const axiosrequest4 = communityConfig.get(
        "/team/steyp-team-members/?priority=4"
      );
      const axiosrequest5 = communityConfig.get(
        "/team/steyp-team-members/?priority=5"
      );
      const axiosrequest6 = communityConfig.get(
        "/team/steyp-team-members/?priority=6"
      );
      const axiosrequest7 = communityConfig.get(
        "/team/steyp-team-members/?priority=7"
      );
      const axiosrequest8 = communityConfig.get(
        "/team/steyp-team-members/?priority=8"
      );
      axios
        .all([
          axiosrequest1,
          axiosrequest2,
          axiosrequest3,
          axiosrequest4,
          axiosrequest5,
          axiosrequest6,
          axiosrequest7,
          axiosrequest8,
        ])
        .then(
          axios.spread(function (
            response1,
            response2,
            response3,
            response4,
            response5,
            response6,
            response7,
            response8
          ) {
            if (response1.data.StatusCode === 6000) {
              setCeo(response1.data.data);
            }
            if (response2.data.StatusCode === 6000) {
              setCoo(response2.data.data);
            }
            if (response3.data.StatusCode === 6000) {
              setAcademicHead(response3.data.data);
            }
            if (response4.data.StatusCode === 6000) {
              setTechnologyHead(response4.data.data);
            }
            if (response5.data.StatusCode === 6000) {
              setAdministrativeHead(response5.data.data);
            }
            if (response6.data.StatusCode === 6000) {
              setMarketHead(response6.data.data);
            }
            if (response7.data.StatusCode === 6000) {
              setRelationHead(response7.data.data);
            }
            if (response8.data.StatusCode === 6000) {
              setcoordinator(response8.data.data);
            }
          })
        )
        .catch((error) => console.log(error));
    };
    getTeam();
  }, []);
  return (
    <Container className="Backborns" data-aos="fade-right">
      <Heading>Team Behind Steyp</Heading>
      <BackBorns>
        <Contains>
          <Left className="ceoo">
            <DpContainer>
              <Dp src={ceo.photo} alt="Image" />
            </DpContainer>
            <Name>{ceo.name}</Name>
            <Designation>{ceo.designation}</Designation>
            <LinkedInContainer target="_blank" href={ceo.linkedin_profile}>
              <IconContainer>
                <Icon
                  src={require("../../../assets/images/web/linkedins.svg")}
                  alt="Image"
                />
              </IconContainer>
              <Div> LinkedIn Profile</Div>
            </LinkedInContainer>
          </Left>
          <Left className="leftcoo">
            <CooDp>
              <DpContainer className="leftdp">
                <Dp src={coo.photo} alt="Image" />
              </DpContainer>
            </CooDp>
            <CooDp className="coodp">
              <Name className="leftcoo">{coo.name}</Name>
              <Designation className="leftcoo">{coo.designation}</Designation>
              <LinkedInContainer
                target="_blank"
                href={coo.linkedin_profile}
                className="leftcoo"
              >
                <IconContainer className="leftcoo">
                  <Icon
                    src={require("../../../assets/images/web/linkedins.svg")}
                    alt="Image"
                  />
                </IconContainer>
                <Div className="leftcoo"> LinkedIn Profile</Div>
              </LinkedInContainer>
            </CooDp>
          </Left>
        </Contains>
        <Right>
          <Left className="right">
            <DpContainer className="right">
              <Dp src={academicHead.photo} alt="Image" />
            </DpContainer>
            <Name className="right">{academicHead.name}</Name>
            <Designation className="right">
              {academicHead.designation}
            </Designation>
            <LinkedInContainer
              target="_blank"
              href={academicHead.linkedin_profile}
              className="right"
            >
              <IconContainer className="right">
                <Icon
                  src={require("../../../assets/images/web/linkedins.svg")}
                  alt="Image"
                />
              </IconContainer>
              <Div className="right"> LinkedIn Profile</Div>
            </LinkedInContainer>
          </Left>
          <Left className="right">
            <DpContainer className="right">
              <Dp src={technologyHead.photo} alt="Image" />
            </DpContainer>
            <Name className="right">{technologyHead.name}</Name>
            <Designation className="right">
              {technologyHead.designation}
            </Designation>
            <LinkedInContainer
              target="_blank"
              href={technologyHead.linkedin_profile}
              className="right"
            >
              <IconContainer className="right">
                <Icon
                  src={require("../../../assets/images/web/linkedins.svg")}
                  alt="Image"
                />
              </IconContainer>
              <Div className="right"> LinkedIn Profile</Div>
            </LinkedInContainer>
          </Left>

          <Left className="right">
            <DpContainer className="right">
              <Dp src={marketHead.photo} alt="Image" />
            </DpContainer>
            <Name className="right">{marketHead.name}</Name>
            <Designation className="right">
              {marketHead.designation}
            </Designation>
            <LinkedInContainer
              target="_blank"
              href={marketHead.linkedin_profile}
              className="right"
            >
              <IconContainer className="right">
                <Icon
                  src={require("../../../assets/images/web/linkedins.svg")}
                  alt="Image"
                />
              </IconContainer>
              <Div className="right"> LinkedIn Profile</Div>
            </LinkedInContainer>
          </Left>
          <Left className="right">
            <DpContainer className="right">
              <Dp src={administrativeHead.photo} alt="Image" />
            </DpContainer>
            <Name className="right">{administrativeHead.name}</Name>
            <Designation className="right">
              {administrativeHead.designation}
            </Designation>
            <LinkedInContainer
              target="_blank"
              href={administrativeHead.linkedin_profile}
              className="right"
            >
              <IconContainer className="right">
                <Icon
                  src={require("../../../assets/images/web/linkedins.svg")}
                  alt="Image"
                />
              </IconContainer>
              <Div className="right"> LinkedIn Profile</Div>
            </LinkedInContainer>
          </Left>
          <Left className="right">
            <DpContainer className="right">
              <Dp src={relationHead.photo} alt="Image" />
            </DpContainer>
            <Name className="right">{relationHead.name}</Name>
            <Designation className="right">
              {relationHead.designation}
            </Designation>
            <LinkedInContainer
              target="_blank"
              href={relationHead.linkedin_profile}
              className="right"
            >
              <IconContainer className="right">
                <Icon
                  src={require("../../../assets/images/web/linkedins.svg")}
                  alt="Image"
                />
              </IconContainer>
              <Div className="right"> LinkedIn Profile</Div>
            </LinkedInContainer>
          </Left>
          <Left className="right">
            <DpContainer className="right">
              <Dp src={coordinator.photo} alt="Image" />
            </DpContainer>
            <Name className="right">{coordinator.name}</Name>
            <Designation className="right">
              {coordinator.designation}
            </Designation>
            <LinkedInContainer
              target="_blank"
              href={coordinator.linkedin_profile}
              className="right"
            >
              <IconContainer className="right">
                <Icon
                  src={require("../../../assets/images/web/linkedins.svg")}
                  alt="Image"
                />
              </IconContainer>
              <Div className="right"> LinkedIn Profile</Div>
            </LinkedInContainer>
          </Left>
        </Right>
      </BackBorns>
    </Container>
  );
}
const Contains = styled.div`
  @media all and (max-width: 1100px) {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 92px;
    grid-gap: 110px;
  }
  @media all and (max-width: 760px) {
    grid-gap: 35px;
  }
  @media all and (max-width: 640px) {
    margin-bottom: 60px;
  }
  @media all and (max-width: 540px) {
    flex-direction: column;
  }
  @media all and (max-width: 420px) {
    margin-bottom: 55px;
    grid-gap: 27px;
  }
`;
const CooDp = styled.div`
  &.coodp {
    @media all and (max-width: 1100px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 55px;
    }
    @media all and (max-width: 640px) {
      margin-top: 53px;
    }
    @media all and (max-width: 540px) {
      margin-top: 0px;
      align-items: flex-start;
    }
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 95px;
  @media all and (max-width: 480px) {
    padding-top: 80px;
  }
`;
const Heading = styled.h2`
  font-size: 36px;
  font-family: gordita_medium;
  color: #212121;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: -85px;
    left: -100px;
    width: 270px;
    height: 270px;
    background: url(${bggradient}) no-repeat;
    background-size: contain;
    display: block;
    z-index: -1;
    @media all and (max-width: 980px) {
      left: 22px;
    }
    @media all and (max-width: 480px) {
      top: -73px;
      width: 230px;
      height: 175px;
    }
  }
  @media all and (max-width: 480px) {
    font-size: 26px;
  }
`;
const BackBorns = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  margin-top: 70px;
  @media all and (max-width: 1200px) {
    padding: 0px 0px;
    grid-template-columns: 1.9fr 2.6fr;
  }
  @media all and (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
  @media all and (max-width: 480px) {
    margin-top: 40px;
  }
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px;
  margin-bottom: 10px;
  position: relative;
  &.ceoo::before {
    content: "";
    position: absolute;
    width: 300px;
    height: 2px;
    display: block;
    bottom: -8px;
    background: #e2fcfe;
    @media all and (max-width: 1100px) {
      display: none;
    }
    @media all and (max-width: 540px) {
      display: block;
      bottom: -27px;
    }
    @media all and (max-width: 540px) {
      width: 174px;
    }
    @media all and (max-width: 420px) {
      bottom: -21px;
    }
  }
  &.leftcoo {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    grid-gap: 35px;
    margin-top: 12px;
    @media all and (max-width: 1150px) {
      grid-gap: 26px;
    }
    @media all and (max-width: 1100px) {
      flex-direction: column;
      grid-gap: 0px;
      margin-top: 0px;
    }
    @media all and (max-width: 540px) {
      justify-content: space-evenly;
      flex-direction: row;
    }
    @media all and (max-width: 356px) {
      width: 100%;
      justify-content: space-evenly;
    }
  }

  @media all and (max-width: 420px) {
    margin-bottom: 0px;
  }

  &.right {
    margin-bottom: 41px;
    width: 28%;
    padding: 0px 0px;
    @media all and (max-width: 1200px) {
      width: 31%;
    }
    @media all and (max-width: 768px) {
      width: 173px;
    }
    @media all and (max-width: 640px) {
      width: 159px;
    }
    @media all and (max-width: 420px) {
      margin-bottom: 25px;
    }
  }
  @media all and (max-width: 1100px) {
    padding: 0px 0px;
    margin-bottom: 10px;
  }
`;
const DpContainer = styled.div`
  width: 211px;
  border-radius: 50%;
  overflow: hidden;
  padding: 15px;
  border: 1px solid #81f6ff;
  margin-bottom: 17px;
  @media all and (max-width: 540px) {
    padding: 10px;
  }

  &.leftdp {
    width: 135px;
    padding: 10px;
    margin-bottom: 0px;
    @media all and (max-width: 1100px) {
      width: 173px;
      transform: translateY(36px);
    }
    @media all and (max-width: 640px) {
      width: 147px;
    }
    @media all and (max-width: 540px) {
      transform: translateY(0px);
      margin-bottom: 17px;
    }
    @media all and (max-width: 540px) {
      margin-right: 10px;
      margin-bottom: 0px;
      width: 127px;
      padding: 7px;
    }
    @media all and (max-width: 385px) {
      width: 106px;
    }
  }
  &.right {
    width: 135px;
    padding: 10px;
    margin-bottom: 15px;
    @media all and (max-width: 540px) {
      width: 119px;
      padding: 7px;
    }
    @media all and (max-width: 420px) {
      margin-bottom: 9px;
    }
    @media all and (max-width: 385px) {
      width: 100px;
    }
  }
  @media all and (max-width: 640px) {
    width: 183px;
  }
  @media all and (max-width: 420px) {
    width: 165px;
  }
  @media all and (max-width: 385px) {
    width: 150px;
  }
`;
const Dp = styled.img`
  border-radius: 50% 50%;
  width: 100%;
  display: block;
`;
const Name = styled.div`
  font-size: 22px;
  color: #545454;
  font-family: "gordita_medium";
  &.right {
    font-size: 18px;
    @media all and (max-width: 540px) {
      font-size: 15px;
    }
  }
  &.leftcoo {
    @media all and (max-width: 640px) {
      font-size: 17px;
    }
    @media all and (max-width: 480px) {
      font-size: 15px;
    }
  }
  @media all and (max-width: 1100px) {
    font-size: 20px;
  }
  @media all and (max-width: 640px) {
    font-size: 17px;
  }
`;
const Designation = styled.p`
  font-size: 15px;
  margin-top: 4px;
  &.leftcoo {
    font-size: 15px;
    margin-top: 4px;
    @media all and (max-width: 640px) {
      font-size: 13px;
    }
    @media all and (max-width: 480px) {
      font-size: 12px;
    }
  }
  &.right {
    font-size: 12px;
    margin-top: 4px;
  }
  @media all and (max-width: 640px) {
    font-size: 13px;
  }
  @media all and (max-width: 480px) {
    font-size: 14px;
    margin-top: 5px;
  }
`;

const LinkedInContainer = styled.a`
  display: flex;
  align-items: center;
  margin-top: 10px;
  background: #017bb6;
  padding: 10px 19px 10px 18px;
  border-radius: 6px;
  cursor: pointer;
  &.right {
    padding: 11px 11px 11px 11px;
    margin-top: 8px;
  }
  &.leftcoo {
    width: fit-content;
    margin-top: 10px;
    @media all and (max-width: 1100px) {
      display: flex;
      align-items: center;
      margin-top: 10px;
      background: #017bb6;
      padding: 10px 19px 10px 18px;
      border-radius: 6px;
      cursor: pointer;
    }
    @media all and (max-width: 480px) {
      margin-top: 5px;
    }
    @media all and (max-width: 360px) {
      padding: 10px 8px 10px 8px;
    }
  }
  @media all and (max-width: 480px) {
    margin-top: 13px;
  }
  @media all and (max-width: 360px) {
    padding: 10px 8px 10px 8px;
  }
`;
const IconContainer = styled.span`
    width: 17px;
    margin-right: 15px;
    transform: translateY(-1px);
    &.leftcoo{
        width: 17px;
        margin-right: 15px;
        transform: translateY(-1px);
        @media all and (max-width:480px){
            width: 17px;
            margin-right:12px;
        }
    }
    &.right {
        width: 14px;
        margin-right: 9px;
        @media all and (max-width:540px){
            width:17px;
            margin-right: 9px !important;

        }
   
`;
const Icon = styled.img`
  width: 100%;
  display: block;
  &:hover {
    filter: invert(27%) sepia(51%) saturate(2878%) hue-rotate(181deg)
      brightness(104%) contrast(97%);
  }
`;
const Div = styled.div`
    font-size: 13px;
    color: #fff;
    transform: translateY(2px);
    padding-left: 10px;
    position: relative;
    &::before {
        content: "";
        position: absolute;
        background: #fff;
        width: 1px;
        height: 23px;
        display: block;
        left: -4px;
        top: -4px;
    }
    &.right {
        transform: translateY(1px);
        font-size: 13px;
        &::before {
            content: "";
            position: absolute;
            background: #fff;
            width: 0.2px;
            height: 21px;
            display: block;
            left: 0px;
            top: -3px;
            opacity: 0.8;
        }
    }
    &.leftcoo {
        font-size: 13px;
        color: #fff;
        transform: translateY(2px);
        padding-left: 10px;
        position: relative;
        &::before {
            content: "";
            position: absolute;
            background: #fff;
            width: 1px;
            height: 23px;
            display: block;
            left: -4px;
            top: -4px;
            @media all and (max-width: 480px) {
                left: -2px;
            }
        }
    }
}
`;
const Right = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  grid-gap: 10px;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    background: #e2fcfe;
    width: 2px;
    height: 345px;
    display: block;
    left: 0px;
    top: 21%;
    @media all and (max-width: 1100px) {
      content: "";
      position: absolute;
      background: #e2fcfe;
      height: 2px;
      width: 345px;
      display: block;
      left: 29%;
      top: -49px;
    }
    @media all and (max-width: 780px) {
      left: 24%;
    }
    @media all and (max-width: 690px) {
      left: 20%;
    }
    @media all and (max-width: 640px) {
      display: none;
    }
    @media all and (max-width: 540px) {
      display: block;
      width: 69%;
      left: unset;
      top: -20px;
    }
    @media all and (max-width: 420px) {
      width: 300px;
    }
  }
  @media all and (max-width: 590px) {
    justify-content: space-around;
    grid-gap: 10px;
  }
  @media all and (max-width: 540px) {
    padding-top: 0px;
    justify-content: space-around;
    grid-gap: 10px;
  }
  @media all and (max-width: 374px) {
    justify-content: center;
  }
  @media all and (max-width: 368px) {
    flex-direction: column;
  }
`;
