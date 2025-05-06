import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import Jdenticon from "react-jdenticon";
import { serverConfig } from "../../../../axiosConfig";

const UserFollowComponent = ({ item, setFollowCount, setModal }) => {
  const [isFollow, setIsFollow] = useState(item?.is_following || false);
  const navigate = useNavigate();

  const handleProfileNavClick = (e) => {
    e.preventDefault();
    setModal(false);
    navigate(`/feed/profile/${item?.username}`);
  };

  useEffect(() => {
    setIsFollow(item?.is_following || false);
  }, [item]);

  const location = useLocation();

  const {
    user_data: { access_token },
  } = useSelector((state) => state);

  const handleFollowClick = (id) => {
    const newIsFollow = !isFollow;
    setIsFollow(newIsFollow);

    updateFollow(id);
  };

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
          toast.success("Followed successfully");
        } else if (message?.message === "Unfollowed") {
          setFollowCount((prevCount) => ({
            ...prevCount,
            follow: prevCount.follow - 1,
          }));
          toast.success("Unfollowed successfully");
        }
      }
    } catch (error) {
      console.error("Error updating like:", error);
      setIsFollow(!isFollow);
    }
  };

  return (
    <ProfileContainer key={item?.id}>
      <DetailsSec>
        <InnerContainer>
          <ProfileNav
            to={`/feed/profile/${item?.username}`}
            onClick={handleProfileNavClick}
          >
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
          <ProfileDiv
            onClick={handleProfileNavClick}
            to={`/feed/profile/${item?.username}`}
          >
            <UserName>{item?.name ?? "--"}</UserName>
            <UserProgram>{item?.designation ?? null}</UserProgram>
          </ProfileDiv>
        </InnerContainer>
        <FollowButton
          onClick={() => handleFollowClick(item?.id)}
          isActive={isFollow}
        >
          {isFollow ? "Unfollow" : "Follow"}
        </FollowButton>
      </DetailsSec>
    </ProfileContainer>
  );
};

export default UserFollowComponent;

const ProfileContainer = styled.div`
  margin-bottom: 24px !important;
  &:last-child {
    margin-bottom: 0 !important;
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

const ProfileDiv = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 0 16px !important;

  @media all and (max-width: 1080px) {
    width: 50%;
    text-overflow: ellipsis;
  }

  @media all and (max-width: 1100px) {
    width: 100%;
  }
`;

const ProfileIcon = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  overflow: hidden;

  @media all and (max-width: 1100px) {
    width: 50px;
  }

  @media all and (max-width: 1024px) {
    width: 50px;
  }
`;

const UserName = styled.h2`
  margin: 0 !important;
  color: #364152;
  font-size: 18px !important;
  font-family: "gordita_medium";
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  vertical-align: top;
  width: 100%;
  margin: 0 !important;
  line-height: 1.2 !important;

  @media all and (max-width: 1100px) {
    font-size: 14px !important;
  }
`;

const UserProgram = styled.h4`
  color: #737376;
  font-size: 14px;
  font-size: 14px !important;
  margin: 0 !important;
`;

const DetailsSec = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const PromImgWrap = styled.div`
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

const ProfileTopSection = styled.div``;

const ProfileBottomSection = styled.div``;
const InnerContainer = styled.div`
  display: flex;
  align-items: center;
`;
