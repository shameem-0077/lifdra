import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import bg from "../../../../../assets/images/leader-board/leaderboard-bg.svg";
import { accountsConfig, learnConfig } from "../../../../../axiosConfig";

function DayLeaderBoard({ subject_slug }) {
  const user_data = useSelector((state) => state.user_data);
  const access_token = user_data.access_token;
  const { slug } = useParams();

  const [leaderboard, setLeaderboard] = useState([]);
  useEffect(() => {
    learnConfig
      .get(`/learn/nano-degree/${slug}/leader-positions/`, {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      })
      .then(function (res) {
        const { status_code, data } = res.data;
        if (status_code == 6000) {
          setLeaderboard(data ? data : []);
        } else if (status_code == 6001) {
        }
      })
      .catch((error) => {});
  }, []);
  return (
    <Container>
      <TopSection>
        <Title>Leaderboard</Title>
        <ViewMore to={`/nanodegree/${subject_slug}/leaderboard/`}>
          View All
        </ViewMore>
      </TopSection>
      {/* {leaderboard.map((item)=)} */}
      <LeaderContainer>
        <SecondCover>
          <ProfileImage>
            <Round className={"second"}>
              {leaderboard[1]?.student_details?.student_image ? (
                <UpdateProfile>
                  <img
                    src={leaderboard[1]?.student_details?.student_image}
                    alt="Profile picture"
                  />
                </UpdateProfile>
              ) : (
                <Avatar
                  name={leaderboard[1]?.student_details?.student_name}
                  size="105%"
                  maxInitials={2}
                />
              )}

              <Badge>
                <img
                  src={require("../../../../../assets/images/new-dashboard/second-badge.svg")}
                  alt=""
                />
              </Badge>
            </Round>
          </ProfileImage>{" "}
          <Deatils>
            <Score className="First">{leaderboard[1]?.point}</Score>
            <Name>{leaderboard[1]?.student_details?.student_name}</Name>
          </Deatils>
        </SecondCover>
        <FirstCover>
          <ProfileImage>
            <Round className={"first"}>
              {leaderboard[0]?.student_details?.student_image ? (
                <UpdateProfile>
                  <img
                    src={leaderboard[0]?.student_details?.student_image}
                    alt="Profile picture"
                  />
                </UpdateProfile>
              ) : (
                <Avatar
                  name={leaderboard[0]?.student_details?.student_name}
                  size="105%"
                  maxInitials={2}
                />
              )}

              <Badge>
                <img
                  src={require("../../../../../assets/images/new-dashboard/first-badge.svg")}
                  alt=""
                />
              </Badge>
            </Round>
          </ProfileImage>{" "}
          <Deatils>
            <Score className="First">{leaderboard[0]?.point}</Score>
            <Name>{leaderboard[0]?.student_details?.student_name}</Name>
          </Deatils>
        </FirstCover>
        <ThirdCover>
          <ProfileImage>
            <Round className={"third"}>
              {leaderboard[2]?.student_details?.student_image ? (
                <UpdateProfile>
                  <img
                    src={leaderboard[2]?.student_details?.student_image}
                    alt="Profile picture"
                  />
                </UpdateProfile>
              ) : (
                <Avatar
                  name={leaderboard[2]?.student_details?.student_name}
                  size="105%"
                  maxInitials={2}
                />
              )}
              <Badge>
                <img
                  src={require("../../../../../assets/images/new-dashboard/third-badge.svg")}
                  alt=""
                />
              </Badge>
            </Round>
          </ProfileImage>{" "}
          <Deatils>
            <Score className="First">{leaderboard[2]?.point}</Score>
            <Name>{leaderboard[2]?.student_details?.student_name}</Name>
          </Deatils>
        </ThirdCover>
      </LeaderContainer>
    </Container>
  );
}

export default DayLeaderBoard;
const Container = styled.div`
  @media all and (max-width: 1100px) {
    margin-top: 20px;
  }
`;
const Title = styled.h3`
  font-size: 18px;
  font-family: gordita_medium;
  color: #4d4d4d;
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
  margin-bottom: 20px;
`;
const LeaderContainer = styled.div`
  background: url(${bg}) no-repeat;
  background-size: cover;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 10px 20px;
  padding-top: 70px;
  border-radius: 10px;
`;
const ProfileImage = styled.span`
  display: block;
  position: relative;
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
  top: 80%;
  position: absolute;
  @media all and (max-width: 480px) {
  }

  img {
    display: block;
    width: 100%;
  }
`;

const Round = styled.div`
  background: #fff;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  border: 5px solid #fff;
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
  &.second {
    width: 80px;
    height: 80px;
  }
  &.first {
    width: 90px;
    height: 90px;
  }
  &.third {
    width: 70px;
    height: 70px;
  }
  @media all and (max-width: 360px) {
    &.second {
      width: 60px;
      height: 60px;
    }
    &.first {
      width: 70px;
      height: 70px;
    }
    &.third {
      width: 50px;
      height: 50px;
    }
  }
`;

const SecondCover = styled.div`
  transform: translateY(-20px);
`;
const FirstCover = styled.div`
  transform: translateY(-40px);
`;
const ThirdCover = styled.div`
  transform: translateY(-10px);
`;
const Score = styled.p`
  color: #116653;
  font-family: gordita_medium !important;
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
  &.First {
    color: #b2781b;
  }
  &.Second {
    color: #495db2;
  }
`;
const Name = styled.h4`
  color: #fff;
  font-family: gordita_medium;
  font-size: 13px;
  text-align: center;
`;
const Deatils = styled.div`
  /* margin-left: 20px; */
`;
const UpdateProfile = styled.div`
  overflow: hidden;

  border-radius: 50%;
  background: #fff;

  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  margin: 0 auto;
  /* margin-bottom: 15px; */
  img {
    display: block;
    width: 100%;
  }
`;
