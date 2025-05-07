import React, { useState } from "react";
import Jdenticon from "react-jdenticon";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { serverConfig } from "../../../axiosConfig";
import FollowBT from "./FollowBT";
import moment from "moment";
import useUserStore from "../../../store/userStore";

function UserProfile({ item, setFollowCount, isModal, time }) {
  const loginData = useUserStore((state) => state.loginData);
  const userProfile = useUserStore((state) => state.userProfile);
  const { accessToken } = loginData;
  const [isFollow, setFollow] = useState(item?.author?.is_following || false);

  const updateFollow = async (id) => {
    try {
      const response = await serverConfig.post(
        `/api/v1/users/follow-user/${id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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

  const truncateCharacters = (text, maxLength) => {
    if (text?.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const formatTime = (dateUpdated) => {
    const now = moment();
    const updatedTime = moment.utc(dateUpdated);
    const duration = moment.duration(now.diff(updatedTime));

    const years = duration.years();
    const months = duration.months();
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    if (years > 0) {
      return `${years}y`;
    } else if (months > 0) {
      return `${months}mo`;
    } else if (days > 0) {
      return `${days}d`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else if (minutes > 0) {
      return `${minutes}m`;
    } else {
      return `${seconds}s`;
    }
  };

  return (
    <>
      <Container>
        <ProfileNav
          to={
            userProfile?.user_id == item?.author?.user_id
              ? "/feed/profile"
              : `/feed/profile/${item?.author?.username}`
          }
        >
          <ProfileIcon>
            {item?.author?.photo ? (
              <img src={item?.author?.photo} alt="Profile" />
            ) : (
              <Jdenticon value={item?.author?.name} />
            )}
          </ProfileIcon>
          <ProfileDiv>
            {isModal === undefined ? (
              <UserNameModal>{item?.author?.name ?? "--"}</UserNameModal>
            ) : (
              <UserName>{item?.author?.name ?? "--"}</UserName>
            )}
            {item?.author?.designation && (
              <UserProgram>
                {item?.author?.designation}
              </UserProgram>
            )}
            <Time>{formatTime(item?.date_updated)}</Time>
          </ProfileDiv>
        </ProfileNav>
        {loginData?.pk !== item?.author?.id ? (
          <FollowBT
            setFollow={setFollow}
            isFollow={isFollow}
            updateFollow={updateFollow}
            autherId={item?.author?.id}
            type="tertiary"
          />
        ) : null}
      </Container>
    </>
  );
}

export default UserProfile;

const pxToRem = (px) => `${(px / 16).toFixed(2)}rem`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ProfileDiv = styled.div``;

const ProfileIcon = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media all and (max-width: 768px) {
    height: 48px;
    width: 48px;
  }
`;

const UserName = styled.h2`
  width: fit-content;
  color: #364152;
  font-size: ${pxToRem(16)};
  font-family: "gordita_medium";
  margin: 0 !important;
`;

const UserNameModal = styled.h2`
  color: #364152;
  font-size: ${pxToRem(16)};
  font-family: "gordita_medium";
  text-transform: capitalize;
`;

const UserProgram = styled.p`
  color: #737376;
  font-size: ${pxToRem(14)};
  margin: 0 !important;
`;

const ProfileNav = styled(Link)`
  display: flex;
  align-items: flex-start;
  gap: 10px;

  @media all and (max-width: 480px) {
    gap: 6px;
    max-width: 300px;
  }
`;

const Time = styled.span`
  color: #9aa4b2;
  line-height: unset;
  padding-top: 4px;
  font-size: ${pxToRem(12)};
`;
