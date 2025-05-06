import React from "react";
import styled from "styled-components";
import Jdenticon from "react-jdenticon";
import { Link } from "react-router-dom";

function ProfileCard({ profileData, followCount, setModal, setActiveTab }) {
  const handleCountClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setModal(true);
  };
  function truncate(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  }

  return (
    <Container>
      <Navigator>
        <Wrapper to={`/feed/profile`}>
          <ProfileIcon>
            {profileData?.photo ? (
              <img src={profileData?.photo} alt="Profile" />
            ) : (
              <Jdenticon
                // size={window.innerWidth > 1280 ? "47" : "45"}
                value={profileData?.name}
              />
            )}
          </ProfileIcon>
          <ProfileDiv>
            <UserName>{profileData?.name ?? "--"}</UserName>
            <UserProgram>
              {truncate(profileData?.designation ?? " ", 50)}
            </UserProgram>
          </ProfileDiv>
          <CountDiv>
            <ButtonContainer
              onClick={(e) => {
                handleCountClick(e);
                setActiveTab("followers");
              }}
            >
              <CountNum>{profileData?.followers ?? "--"}</CountNum>
              <CountText>
                {profileData?.followers === 1 ? "Follower" : "Followers"}
              </CountText>
            </ButtonContainer>
            <ButtonContainer
              onClick={(e) => {
                handleCountClick(e);
                setActiveTab("following");
              }}
            >
              <CountNum>{followCount?.follow ?? "--"}</CountNum>
              <CountText>Following</CountText>
            </ButtonContainer>
          </CountDiv>
        </Wrapper>
      </Navigator>
    </Container>
  );
}

export default ProfileCard;

const Container = styled.div`
  border-radius: 12px;
  border: 1.6px solid #eef2f6;
  overflow: hidden;
  cursor: pointer;
  background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/28-09-2024/namecard-background.svg");
  background-size: contain;
  background-repeat: no-repeat;
  padding: 32px 20px 20px 20px;
`;
const Navigator = styled.div``;
const ProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: start;
  margin-bottom: 22px;
`;

const ProfileIcon = styled.div`
  height: 72px;
  width: 72px;
  background: #fff;
  border-radius: 50%;
  margin-bottom: 10px;
  border: 4px solid #ffffff;
  overflow: hidden;
  img {
    width: 100%;
    display: inline-block;
  }
`;

const UserName = styled.h2`
  color: #121926;
  font-size: 1.429rem;
  font-family: "gordita_medium";
  margin: 0 !important;
  text-transform: capitalize;
`;

const UserProgram = styled.h4`
  color: #475467;
  font-size: 1rem;
  margin: 0 !important;
`;
const Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-content: center;
`;
const CountDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const CountNum = styled.h4`
  font-size: 1.243rem;
  color: #27364b;
  font-family: "gordita_medium";
  margin-right: 8px;
`;
const CountText = styled.span`
  font-size: 0.857rem;
  color: #4b5669 !important;
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 22px;
  &:last-child {
    margin-right: 0;
  }
`;
