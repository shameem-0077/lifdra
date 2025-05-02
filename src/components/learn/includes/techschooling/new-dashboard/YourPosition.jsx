import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { studentActivitiesConfig } from "../../../../../axiosConfig";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";

function YourPosition({ subject_slug }) {
  const [myData, setMyData] = useState({});
  const { user_profile, user_data } = useSelector((state) => state);
  const access_token = user_data.access_token;
  const name = user_data.name;
  useEffect(() => {
    studentActivitiesConfig
      .get("leader-boards/my-position/", {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      })
      .then(function (res) {
        if (res.data.StatusCode == 6000) {
          setMyData(res.data.data);
        }
      });
  }, []);
  return (
    <Container>
      <TopSection>
        <Title>Your Position</Title>
        <ViewMore to={`/nanodegree/${subject_slug}/leaderboard/`}>
          Know more
        </ViewMore>
      </TopSection>
      <ContentSection>
        <DecoreImg
          src={require("../../../../../assets/images/new-dashboard/decore.svg")}
          alt="decore"
        />
        <LeftSection className={user_profile.photo ? "active" : ""}>
          {user_profile.photo ? (
            <UpdateProfile>
              <img src={user_profile.photo} alt="Profile picture" />
            </UpdateProfile>
          ) : (
            <Avatar size="100%" name={name} maxInitials={2} />
          )}
        </LeftSection>
        <RightSection>
          <ProfileName>{name}</ProfileName>
          <DetailSection>
            <Section>
              <Count>{myData.position ? myData.position : "0"}</Count>
              <Label>Rank</Label>
            </Section>
            <Section>
              <Count>{myData.total_point ? myData.total_point : "0"}</Count>
              <Label>Total&nbsp;Points</Label>
            </Section>
            <Section>
              <Medal>
                {myData.position == 1 ? (
                  <img
                    src={require("../../../../../assets/images/new-dashboard/first-badge.svg")}
                    alt="Badge"
                  />
                ) : myData.position == 2 ? (
                  <img
                    src={require("../../../../../assets/images/new-dashboard/second-badge.svg")}
                    alt="Badge"
                  />
                ) : myData.position == 3 ? (
                  <img
                    src={require("../../../../../assets/images/new-dashboard/third-badge.svg")}
                    alt="Badge"
                  />
                ) : (
                  <img
                    src={require("../../../../../assets/images/new-dashboard/medal.svg")}
                    alt="Badge"
                  />
                )}
              </Medal>
              <Label>Badge</Label>
            </Section>
          </DetailSection>
        </RightSection>
      </ContentSection>
    </Container>
  );
}

export default YourPosition;
const Container = styled.div`
  margin-top: 30px;
`;
const Title = styled.h3`
  font-size: 18px;
  font-family: gordita_medium;
  color: #4d4d4d;
  @media all and (max-width: 360px) {
    font-size: 16px;
  }
`;
const ViewMore = styled(Link)`
  font-size: 14px;
  font-family: gordita_regular;
  color: #0fa76f;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
const ContentSection = styled.div`
  padding: 20px 15px;
  background-color: #01575c;
  border-radius: 8px;
  display: flex;
  align-items: center;
  position: relative;
  @media all and (max-width: 480px) {
    padding: 8px 4px;
  }
`;
const LeftSection = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;

  margin-right: 10px;
  border: 4px solid #2a7572;
  overflow: hidden;
  &.active {
    background-color: #fff;
  }
  @media all and (max-width: 480px) {
    border: 2px solid #2a7572;
    width: 70px;
    height: 70px;
    min-width: 70px;
  }
  img {
    width: 100%;
    display: block;
  }
`;
const RightSection = styled.div`
  flex: 1;
  position: relative;
  z-index: 2;
`;
const ProfileName = styled.h4`
  font-size: 16px;
  font-family: gordita_medium;
  color: #fff;
  margin-bottom: 10px;
  @media all and (max-width: 640px) {
    font-size: 14px;
  }
`;
const DetailSection = styled.div`
  background: #2a7572;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  border-radius: 8px;
`;
const Section = styled.div`
  padding: 10px;
  flex: 1;
  border-right: 2px solid #01575c;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  @media all and (max-width: 480px) {
    padding: 8px;
  }
  @media all and (max-width: 360px) {
    padding: 5px;
  }
`;
const Count = styled.h5`
  font-family: gordita_medium;
  font-size: 22px;
  color: #fff;
  text-align: center;
  @media all and (max-width: 640px) {
    font-size: 16px;
  }
`;
const Label = styled.p`
  color: #fff;
  text-align: center;
  font-family: gordita_regular;
  font-size: 14px;
  @media all and (max-width: 360px) {
    font-size: 13px;
  }
`;
const Medal = styled.span`
  display: block;
  width: 25px;
  margin: 0 auto;
  margin-bottom: 5px;
  @media all and (max-width: 640px) {
    width: 20px;
    margin-bottom: 2px;
  }
  @media all and (max-width: 480px) {
    width: 15px;
  }
  img {
    width: 100%;
    display: block;
  }
`;
const DecoreImg = styled.img`
  display: block;
  width: 20%;
  max-width: 90px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  opacity: 0.4;
`;
const UpdateProfile = styled.div`
  /* width: 75%; */
  overflow: hidden;
  /* max-width: 150px;
  min-width: 150px;
  max-height: 150px;
  min-height: 150px; */
  border-radius: 50%;
  /* border: 7px solid #f8f8f8; */
  /* overflow: hidden; */
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  margin: 0 auto;
  img {
    display: block;
    width: 100%;
  }
  /* @media all and (max-width: 480px) {
    max-width: 120px;
    min-width: 120px;
    max-height: 120px;
    min-height: 120px;
  } */
`;
