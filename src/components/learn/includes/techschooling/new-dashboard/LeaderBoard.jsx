import React, { useState, useEffect } from "react";
import styled from "styled-components";
import pops from "../../../../../assets/images/new-dashboard/color-pops.svg";
import { useSelector } from "react-redux";
import { accountsConfig, activityConfig } from "../../../../../axiosConfig";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";

function LeaderBoard() {
  const user_data = useSelector((state) => state.user_data);
  const access_token = user_data.access_token;
  const [leaderboard, setLeaderboard] = useState([]);
  useEffect(() => {
    accountsConfig
      .get("api/v1/users/leader-positions/", {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      })
      .then(function (res) {
        const { StatusCode, data } = res.data;
        if (StatusCode == 6000) {
          setLeaderboard(data);
        } else if (StatusCode == 6001) {
        }
      })
      .catch((error) => {});
  }, []);

  return (
    <Container>
      <TopSection>
        <Title>Leaderboard</Title>
        <ViewMore to={`/nanodegree/${this.props.slug}/leaderboard/`}>
          View All
        </ViewMore>
      </TopSection>
      <ContentSection>
        <First>
          <ProfileImage>
            <Round>
              <Avatar
                name={leaderboard[0]?.student_name}
                size="100"
                maxInitials={2}
              />
            </Round>
            <Badge>
              <img
                src={require("../../../../../assets/images/new-dashboard/first-badge.svg")}
                alt=""
              />
            </Badge>
          </ProfileImage>
          <Deatils>
            <Score className="First">{leaderboard[0]?.point}</Score>
            <Name>{leaderboard[0]?.student_name}</Name>
          </Deatils>
        </First>
        <Second>
          <ProfileImage>
            <Round>
              <Avatar
                name={leaderboard[1]?.student_name}
                size="100"
                maxInitials={2}
              />
            </Round>
            <Badge>
              <img
                src={require("../../../../../assets/images/new-dashboard/second-badge.svg")}
                alt=""
              />
            </Badge>
          </ProfileImage>
          <Deatils>
            <Score className="Second">{leaderboard[1]?.point}</Score>
            <Name>{leaderboard[1]?.student_name}</Name>
          </Deatils>
        </Second>
        <Third>
          <ProfileImage>
            <Round>
              <Avatar
                name={leaderboard[2]?.student_name}
                size="100"
                maxInitials={2}
              />
            </Round>
            <Badge>
              <img
                src={require("../../../../../assets/images/new-dashboard/third-badge.svg")}
                alt=""
              />
            </Badge>
          </ProfileImage>
          <Deatils>
            <Score>{leaderboard[2]?.point}</Score>
            <Name>{leaderboard[2]?.student_name}</Name>
          </Deatils>
        </Third>
      </ContentSection>
    </Container>
  );
}

export default LeaderBoard;
const Container = styled.div`
  @media all and (max-width: 1100px) {
    margin-top: 20px;
  }
`;
const Title = styled.h3`
  font-size: 18px;
  font-family:'gordita_medium';
  color: #4d4d4d;
  font-size: 18px;
  font-family:'gordita_medium';
  color: #4d4d4d;
  @media all and (max-width: 360px) {
    font-size: 16px;
  }
`;
const ViewMore = styled(Link)`
  font-size: 14px;
  font-family: 'gordita_regular';
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
  margin-bottom: 20px;
`;
const Round = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  border: 2px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  /* @media all and (max-width: 480px) {
        width: 75px;
        height: 75px;
    } */
  &.avatar {
    border-radius: 50%;
  }
`;
const ContentSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Second = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 8px;
  padding: 15px;
  width: 100%;
  margin-top: 20px;
  background: #a9dafe url(${pops}) no-repeat;
`;
const Deatils = styled.div`
  margin-left: 20px;
`;
const First = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 8px;
  padding: 15px;
  width: 100%;
  background: #fccd80 url(${pops}) no-repeat;
`;
const Third = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 8px;
  padding: 15px;
  width: 100%;
  margin-top: 20px;
  background: #7aceaf url(${pops}) no-repeat;
`;
const ProfileImage = styled.span`
  display: block;
  position: relative;
  /* width: 30%; */
  border-radius: 50%;
  img {
    width: 100%;
    display: block;
  }
`;
const Badge = styled.span`
  display: block;
  width: 25px;
  left: 52%;
  transform: translate(-50%);
  top: 70%;
  /*right: 35%; */
  position: absolute;
  @media all and (max-width: 480px) {
  }

  img {
    display: block;
    width: 100%;
  }
`;
const Score = styled.p`
  color: #116653;
  font-family:'gordita_medium' !important;
  font-size: 20px;
  &.First {
    color: #b2781b;
  }
  &.Second {
    color: #495db2;
  }
`;
const Name = styled.h4`
  color: #01575c;
  font-family:'gordita_medium';
  font-size: 16px;
  transform: capitalize;
`;
