import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { accountsConfig } from "../../../../../axiosConfig";
import ProficPic from "../../../../../assets/images/community/profile-pic.svg";
import Jdenticon from "react-jdenticon";
import FollowBT from "../FollowBT";
import { tr } from "date-fns/locale";
import SuggestionSkeleton from "./SuggestionSkeleton";

const SuggestionProfileCard = ({ item, setFollowCount, type }) => {
  const [isFollow, setIsFollow] = useState(item?.is_following || false);
  const [isSuggestionLoading, setSuggestionLoading] = useState(false);
  const [suggestion, setSuggestion] = useState([]);

  useEffect(() => {
    setIsFollow(item?.is_following || false);
  }, [item]);

  const {
    user_data: { access_token },
  } = useSelector((state) => state);

  //   const handleFollowClick = (id) => {
  //     const newIsFollow = !isFollow;
  //     setIsFollow(newIsFollow);

  //     updateFollow(id);
  //   };

  const updateFollow = async (id) => {
    try {
      const response = await accountsConfig.post(
        `/api/v1/users/follow-user/${id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const { status_code, data, message } = response.data;
      if (status_code === 6000) {
        if (message?.message === "Followed") {
          setFollowCount((prevCount) => ({
            ...prevCount,
            follow: prevCount.follow + 1,
          }));
          setSuggestion(data);
          setSuggestionLoading(false);
        } else if (message?.message === "Unfollowed") {
          setFollowCount((prevCount) => ({
            ...prevCount,
            follow: prevCount.follow - 1,
          }));
          setSuggestion([]);
          setSuggestionLoading(false);
        }
      }
    } catch (error) {
      console.error("Error updating like:", error);
      setIsFollow(!isFollow);
    }
  };

  return (
    <>
      {type == "suggestion" && (
        <>
          <ProfileContainer key={item?.id}>
            <DetailsSec>
              <ProfileNav to={`/feed/profile/${item?.username}`}>
                <ProfileIcon>
                  {item?.photo ? (
                    <ProfilePic src={item?.photo} alt={item?.name} />
                  ) : (
                    <PromImgWrap>
                      <Jdenticon value={item?.name} />
                    </PromImgWrap>
                  )}
                </ProfileIcon>
              </ProfileNav>
              <RightSec type={type}>
                <ProfileDiv to={`/feed/profile/${item?.username}`}>
                  <UserName>{item?.name ?? "--"}</UserName>
                  {item?.designation && (
                    <UserProgram>{item?.designation}</UserProgram>
                  )}
                </ProfileDiv>
                <FollowActionDiv>
                  <FollowBT
                    setFollow={setIsFollow}
                    isFollow={isFollow}
                    updateFollow={updateFollow}
                    autherId={item?.id}
                    type="tertiary"
                  />
                </FollowActionDiv>
              </RightSec>
            </DetailsSec>                                                           
            {/* <Learn></Learn> */}
          </ProfileContainer>
        </>
      )}
      {type == "community" && (
        <>
          <ProfileContainer type={type} key={item?.id}>
            <DetailsSec type={type}>
              <ProfileNav to={`/feed/profile/${item?.username}`}>
                <ProfileIcon type={type}>
                  {item?.photo ? (
                    <ProfilePic src={item?.photo} alt={item?.name} />
                  ) : (
                    <PromImgWrap type={type}>
                      <Jdenticon value={item?.name} />
                    </PromImgWrap>
                  )}
                </ProfileIcon>
              </ProfileNav>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <RightSec type={type}>
                  <ProfileDiv>
                    <UserName type={type}>{item?.name ?? "--"}</UserName>
                    {item?.designation && (
                      <>
                        <UserProgram type={type}>
                          {item?.designation}
                        </UserProgram>
                      </>
                    )}
                  </ProfileDiv>
                </RightSec>
                <FollowActionDiv>
                  <FollowBT
                    setFollow={setIsFollow}
                    isFollow={isFollow}
                    updateFollow={updateFollow}
                    autherId={item?.id}
                    type="tertiary"
                  />
                </FollowActionDiv>
              </div>
            </DetailsSec>
            {/* <Learn></Learn> */}
          </ProfileContainer>
        </>
      )}
    </>
  );
};

export default SuggestionProfileCard;

const ProfileContainer = styled.div`
  background-color: ${({ type }) => (type === "community" ? "#ffffff" : "")};
  border-radius: ${({ type }) => (type === "community" ? "16px" : "0px")};
  border: ${({ type }) => (type === "community" ? "1px solid #E3E8EF" : "")};
  padding: ${({ type }) => (type === "community" ? "16px" : "")};

  &:last-child {
    margin-bottom: 0;
  }
`;

const FollowButton = styled.button`
  padding: 0 12px;
  background: #059664;
  border-radius: 8px;
  display: block;
  height: 34px;
  font-size: 14px;
  width: fit-content;
  color: #ffffff;
  cursor: pointer;
  font-family: "gordita_medium";
  transition: transform 0.2s ease-in-out, background 0.3s, color 0.3s,
    border 0.3s;

  :hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.95);
  }

  ${(props) =>
    props.isActive &&
    `
    border: 1px solid #cdd5df;
    background: #ffffff;
    color: #364152;
  `}
`;

const RightSec = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${({ type }) => (type == "community" ? "column" : "row")};
  justify-content: ${({ type }) =>
    type == "community" ? "center" : " space-between"};
  align-items: ${({ type }) => (type == "community" ? "center" : "flex-start")};
  @media all and (max-width: 1240px) {
    font-size: 0.857rem;
    flex-direction: row;
  }
  @media all and (max-width: 1024px) {
    font-size: 1rem;
    flex-direction: row;
    align-items: center;
  }
`;
const ProfileDiv = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media all and (max-width: 1080px) {
    width: 50%;
    text-overflow: ellipsis;
  }

  @media all and (max-width: 1100px) {
    width: 100%;
  }
`;

const ProfileIcon = styled.div`
  height: ${({ type }) => (type == "community" ? "56px" : "40px")};
  width: ${({ type }) => (type == "community" ? "56px" : "40px")};
  border-radius: 50%;
  overflow: hidden;
`;

const UserName = styled.h2`
  text-align: ${({ type }) => (type == "community" ? "center" : "left")};
  color: #0c1024;
  font-size: 16px;
  font-family: "gordita_medium";
  text-transform: capitalize;
  white-space: pre-wrap;
  text-overflow: ellipsis;
  display: inline-block;
  vertical-align: top;
  width: 100%;
  margin: 0 !important;

  @media all and (max-width: 1100px) {
    font-size: 14px;
  }
`;

const UserProgram = styled.h4`
  text-align: ${({ type }) => (type == "community" ? "center" : "left")};

  color: #697586;
  font-size: 14px;
  margin: 0 !important;

  @media all and (max-width: 1180px) {
    font-size: 11px;
  }
  @media all and (max-width: 1025px) {
    font-size: 13px;
  }
`;

const DetailsSec = styled.div`
  display: flex;
  width: ${({ type }) => (type === "community" ? "164px" : "100%")};
  max-height: ${({ type }) => (type === "community" ? "190px" : "")};
  flex-wrap: ${({ type }) => (type == "community" ? "wrap" : "nowrap")};
  flex-direction: ${({ type }) => (type == "community" ? "column" : "row")};
  gap: ${({ type }) => (type == "community" ? "8px" : "4px")};
  align-items: center;
  @media all and (max-width: 1280px) {
    align-items: ${({ type }) =>
      type === "community" ? "center" : "flex-start"};
  }
`;

const PromImgWrap = styled.div`
  height: ${({ type }) => (type == "community" ? "56px" : "40px")};
  width: ${({ type }) => (type == "community" ? "56px" : "40px")};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ProfilePic = styled.img`
  width: 100%;
  display: block;
  object-fit: contain;
`;

const ProfileNav = styled(Link)`
  display: flex;
`;

const FollowActionDiv = styled.div``;

const ProfileBottomSection = styled.div``;
