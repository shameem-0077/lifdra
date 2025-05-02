import React, { useState } from "react";
import FollowBT from "../../../includes/community/FollowBT";
import { useSelector } from "react-redux";
import { accountsConfig } from "../../../../../axiosConfig";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Jdenticon from "react-jdenticon";

const SearchProfileCard = ({ item }) => {
  const [isFollow, setFollow] = useState(item?.is_followed || false);
  const [followCount, setFollowCount] = useState({
    follow: 0,
    follower: 0,
  });

  const {
    user_data: { access_token },
    user_data,
  } = useSelector((state) => state);

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
        } else if (message?.message === "Unfollowed") {
          setFollowCount((prevCount) => ({
            ...prevCount,
            follow: prevCount.follow - 1,
          }));
        }
      }
    } catch (error) {
      console.error("Error updating like:", error);
      setFollow(!isFollow);
    }
  };

  return (
    <>
      <ProfileContainer>
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
          <RightSec>
            <ProfileDiv to={`/feed/profile/${item?.username}`}>
              <UserName>{item?.name ?? "--"}</UserName>
              <>
                <UserProgram>
                  {item?.designation ? item?.designation : "--"}
                </UserProgram>
              </>
            </ProfileDiv>
            <FollowActionDiv>
              <FollowBT
                setFollow={setFollow}
                isFollow={isFollow}
                updateFollow={updateFollow}
                autherId={item?.pk}
                type="tertiary"
              />
            </FollowActionDiv>
          </RightSec>
        </DetailsSec>
      </ProfileContainer>
    </>
  );
};

export default SearchProfileCard;

const pxToRem = (px) => `${(px / 14).toFixed(2)}rem`;

const RightSec = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media all and (max-width: 1240px) {
    font-size: 0.857rem;
  }
  @media all and (max-width: 1180px) {
    font-size: 1rem;
  }

  @media all and (max-width: 380px) {
    flex-direction: column;
  }
`;
const ProfileDiv = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media all and (max-width: 380px) {
    width: 100%;
    text-overflow: ellipsis;
  }
`;

const ProfileIcon = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  overflow: hidden;
`;

const UserName = styled.h2`
  color: #0c1024;
  font-size: 16px;
  font-family: "gordita_medium";

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
  color: #697586;
  font-size: 14px;
  margin: 0 !important;
  @media all and (max-width: 1025px) {
    font-size: 13px;
  }
`;

const DetailsSec = styled.div`
  padding: 8px 0;
  display: flex;
  gap: 4px;
  align-items: center;
  @media all and (max-width: 1280px) {
    align-items: center;
  }
`;

const PromImgWrap = styled.div`
  height: 40px;
  width: 40px;
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

const ProfileContainer = styled.div`
  &:last-child {
    margin-bottom: 0;
  }
`;
