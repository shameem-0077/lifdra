import React, { useState } from "react";
import styled from "styled-components";
import Jdenticon from "react-jdenticon";
import FollowBT from "../../community/FollowBT";
import { serverConfig } from "../../../../../axiosConfig";
import { useSelector } from "react-redux";

function NotificationCard({ data }) {
  const [isFollow, setIsFollow] = useState(
    data?.sender_data?.is_following || false
  );
  const [followCount, setFollowCount] = useState({
    follow: 0,
    follower: 0,
  });
  const {
    user_data: { access_token },
  } = useSelector((state) => state);

  const { user_profile } = useSelector((state) => state);

  function timeAgo(dateAdded) {
    const date = new Date(dateAdded);
    const now = new Date();

    // Calculate the time difference in milliseconds
    const timeDiff = now - date;

    // Convert to various time units
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    // Determine the appropriate time format
    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""} ago`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""} ago`;
    } else if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return "Just now";
    }
  }

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
          // setSuggestion(data);
          // setSuggestionLoading(false);
        } else if (message?.message === "Unfollowed") {
          setFollowCount((prevCount) => ({
            ...prevCount,
            follow: prevCount.follow - 1,
          }));
          // setSuggestion([]);
          // setSuggestionLoading(false);
        }
      }
    } catch (error) {
      console.error("Error updating like:", error);
      setIsFollow(!isFollow);
    }
  };

  return (
    <>
      {data?.category_details?.name === "follow_user" && (
        <>
          <MainContainer
            action={data?.is_read}
            href={data?.route ? data?.route + data?.sender_data?.username : "/"}
          >
            <MainLeftContainer>
              <NotificationIcons>
                {data?.sender_data && data?.sender_data?.photo ? (
                  <MainIcon>
                    <img src={data?.sender_data?.photo} alt="Profile" />
                  </MainIcon>
                ) : (
                  <>
                    <Jdenticon
                      value={
                        data?.sender_data?.name
                          ? data?.sender_data?.name
                          : data?.title
                      }
                    />
                  </>
                )}
                {data?.category_details?.icon && (
                  <>
                    <SecondaryIcon>
                      <img
                        src={data?.category_details?.icon}
                        alt="systemIcon"
                      />
                    </SecondaryIcon>
                  </>
                )}
              </NotificationIcons>
              <Description>
                <ShortDescription action={data?.category_details?.name}>
                  {data?.sender_data?.name ? (
                    <>
                      <Title>{data?.sender_data?.name}</Title>
                    </>
                  ) : null}
                  {data?.message}
                </ShortDescription>
                <Time>{timeAgo(data?.date_added)}</Time>
              </Description>
            </MainLeftContainer>
            <NotificationContent
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <div>
                <FollowBT
                  setFollow={setIsFollow}
                  isFollow={isFollow}
                  updateFollow={updateFollow}
                  autherId={data?.sender_data?.id}
                  type="tertiary"
                />
              </div>
            </NotificationContent>
          </MainContainer>
        </>
      )}
      {data?.category_details?.name === "alert_post_upload" && (
        <>
          <MainContainer
            action={data?.is_read}
            href={data?.route ? data?.route + data?.sender_data?.username : "/"}
          >
            <MainLeftContainer>
              <NotificationIcons>
                {data?.sender_data?.photo === null ||
                data?.sender_data?.photo === "" ? (
                  <>
                    <Jdenticon value={data?.sender_data?.name} />
                  </>
                ) : (
                  <>
                    <MainIcon>
                      <img src={data?.sender_data?.photo} alt="Profile" />
                    </MainIcon>
                  </>
                )}
                {data?.category_details?.icon && (
                  <>
                    <SecondaryIcon>
                      <img
                        src={data?.category_details?.icon}
                        alt="systemIcon"
                      />
                    </SecondaryIcon>
                  </>
                )}
              </NotificationIcons>
              <Description>
                <ShortDescription>
                  {data?.sender_data?.name ? (
                    <>
                      <Title>{data?.sender_data?.name}</Title>
                    </>
                  ) : null}
                  {data?.title ? data?.title : "Post Uploaded"}
                </ShortDescription>
                <Time>{timeAgo(data?.date_added)}</Time>
              </Description>
            </MainLeftContainer>
            {data?.action_details?.thumbnail_url && (
              <>
                <ContentDetail>
                  <Content>
                    <img
                      src={data?.action_details?.thumbnail_url}
                      alt="Thumbnail"
                    />
                  </Content>
                </ContentDetail>
              </>
            )}
          </MainContainer>
        </>
      )}

      {data?.category_details?.name === "post_upload" && (
        <>
          <MainContainer
            action={data?.is_read}
            href={data?.route ? data?.route : "/"}
          >
            <MainLeftContainer>
              <NotificationIcons>
                <>
                  <MainIcon>
                    <img src={user_profile?.photo} alt="Profile" />
                  </MainIcon>
                </>
                {data?.category_details?.icon && (
                  <>
                    <SecondaryIcon>
                      <img
                        src={data?.category_details?.icon}
                        alt="systemIcon"
                      />
                    </SecondaryIcon>
                  </>
                )}
              </NotificationIcons>
              <Description>
                <ShortDescription action={data?.category_details?.name}>
                  {data?.title ? (
                    <>
                      <Title>{data?.title}</Title>
                    </>
                  ) : null}
                  {data?.message}
                </ShortDescription>
                <Time>{timeAgo(data?.date_added)}</Time>
              </Description>
            </MainLeftContainer>
          </MainContainer>
        </>
      )}
      {data?.category_details?.name === "post_comment" && (
        <>
          <MainContainer
            action={data?.is_read}
            href={data?.route ? data?.route : "#"}
          >
            <MainLeftContainer>
              <NotificationIcons>
                {data?.sender_data?.photo === null ? (
                  <>
                    <Jdenticon value={data?.sender_data?.name} />
                  </>
                ) : (
                  <>
                    <MainIcon>
                      <img src={data?.sender_data?.photo} alt="Profile" />
                    </MainIcon>
                  </>
                )}
                {data?.category_details?.icon && (
                  <>
                    <SecondaryIcon>
                      <img
                        src={data?.category_details?.icon}
                        alt="systemIcon"
                      />
                    </SecondaryIcon>
                  </>
                )}
              </NotificationIcons>
              <Description>
                <ShortDescription>
                  {data?.sender_data?.name ? (
                    <>
                      <Title>{data?.sender_data?.name}</Title>
                    </>
                  ) : null}
                  {data?.message}
                </ShortDescription>
                {data?.date_added && <Time>{timeAgo(data?.date_added)}</Time>}
              </Description>
            </MainLeftContainer>
            {data?.action_details?.thumbnail_url && (
              <>
                <ContentDetail>
                  <Content>
                    <img
                      src={data?.action_details?.thumbnail_url}
                      alt="Thumbnail"
                    />
                  </Content>
                </ContentDetail>
              </>
            )}
          </MainContainer>
        </>
      )}
      {data?.category_details?.name === "post_like" && (
        <>
          <MainContainer
            action={data?.is_read}
            href={data?.route ? data?.route : "#"}
          >
            <MainLeftContainer>
              <NotificationIcons>
                {data?.sender_data?.photo === null ||
                data?.sender_data?.photo === "" ? (
                  <>
                    <Jdenticon value={data?.sender_data?.name} />
                  </>
                ) : (
                  <>
                    <MainIcon>
                      <img src={data?.sender_data?.photo} alt="Profile" />
                    </MainIcon>
                  </>
                )}
                {data?.category_details?.icon && (
                  <>
                    <SecondaryIcon>
                      <img
                        src={data?.category_details?.icon}
                        alt="systemIcon"
                      />
                    </SecondaryIcon>
                  </>
                )}
              </NotificationIcons>
              <Description>
                <ShortDescription>
                  {data?.sender_data?.name ? (
                    <>
                      <Title>{data?.sender_data?.name}</Title>
                    </>
                  ) : null}
                  {data?.message}
                </ShortDescription>
                <Time>{timeAgo(data?.date_added)}</Time>
              </Description>
            </MainLeftContainer>
            {data?.action_details?.thumbnail_url && (
              <>
                <ContentDetail>
                  <Content>
                    <img
                      src={data?.action_details?.thumbnail_url}
                      alt="Thumbnail"
                    />
                  </Content>
                </ContentDetail>
              </>
            )}
          </MainContainer>
        </>
      )}
      {data?.category_details?.name === "plan_expire_reminder" && (
        <>
          <MainContainer
            action={data?.is_read}
            href={data?.route ? data?.route : "/"}
          >
            <MainLeftContainer>
              <NotificationIcons>
                {data?.sender_data?.photo === null ? (
                  <>
                    <Jdenticon value={data?.sender_data?.name} />
                  </>
                ) : (
                  <>
                    <MainIcon>
                      <img src={data?.sender_data?.photo} alt="Profile" />
                    </MainIcon>
                  </>
                )}
                {data?.category_details?.icon && (
                  <>
                    <SecondaryIcon>
                      <img
                        src={data?.category_details?.icon}
                        alt="systemIcon"
                      />
                    </SecondaryIcon>
                  </>
                )}
              </NotificationIcons>
              <Description>
                <ShortDescription action={data?.category_details?.name}>
                  {data?.title ? (
                    <>
                      <Title>{data?.title}</Title>
                    </>
                  ) : null}
                  {data?.message}
                </ShortDescription>
                <Time>{timeAgo(data?.date_added)}</Time>
              </Description>
            </MainLeftContainer>
          </MainContainer>
        </>
      )}
      {data?.category_details?.name === "new_program_arrival" && (
        <>
          <MainContainer
            action={data?.is_read}
            href={data?.route ? data?.route : "/"}
          >
            <MainLeftContainer>
              <NotificationIcons>
                {data?.sender_data?.photo === null ? (
                  <>
                    <Jdenticon value={data?.sender_data?.name} />
                  </>
                ) : (
                  <>
                    <MainIcon>
                      <img src={data?.sender_data?.photo} alt="Profile" />
                    </MainIcon>
                  </>
                )}
                {data?.category_details?.icon && (
                  <>
                    <SecondaryIcon>
                      <img
                        src={data?.category_details?.icon}
                        alt="systemIcon"
                      />
                    </SecondaryIcon>
                  </>
                )}
              </NotificationIcons>
              <Description>
                <ShortDescription action={data?.category_details?.name}>
                  {data?.title ? (
                    <>
                      <Title>{data?.title}</Title>
                    </>
                  ) : null}
                  {data?.message}
                </ShortDescription>
                <Time>{timeAgo(data?.date_added)}</Time>
              </Description>
            </MainLeftContainer>
          </MainContainer>
        </>
      )}
      {data?.category_details?.name === "practice_evaluation_completed" ? (
        <>
          <MainContainer
            action={data?.is_read}
            href={data?.route ? data?.route : "/"}
          >
            <MainLeftContainer>
              <NotificationIcons>
                {data?.sender_data?.photo === null ? (
                  <>
                    <Jdenticon value={data?.sender_data?.name} />
                  </>
                ) : (
                  <>
                    <MainIcon>
                      <img src={data?.sender_data?.photo} alt="Profile" />
                    </MainIcon>
                  </>
                )}
                <SecondaryIcon>
                  <img src={data?.category_details?.icon} alt="systemIcon" />
                </SecondaryIcon>
              </NotificationIcons>
              <Description>
                <ShortDescription>
                  <Title>{data?.title}</Title>
                  {data?.message}
                </ShortDescription>
                <Time></Time>
              </Description>
            </MainLeftContainer>
          </MainContainer>
        </>
      ) : (
        <></>
      )}
      {/* {
        <>
          <MainContainer
            action={data?.is_read}
            href={data?.route ? data?.route : "/"}
          >
            <MainLeftContainer>
              <NotificationIcons>
                {data?.sender_data?.photo === null ? (
                  <>
                    <Jdenticon value={data?.sender_data?.name} />
                  </>
                ) : (
                  <>
                    <MainIcon>
                      <img src={data?.sender_data?.photo} alt="Profile" />
                    </MainIcon>
                  </>
                )}
                {data?.category_details?.icon && (
                  <>
                    <SecondaryIcon>
                      <img
                        src={data?.category_details?.icon}
                        alt="systemIcon"
                      />
                    </SecondaryIcon>
                  </>
                )}
              </NotificationIcons>
              <Description>
                <ShortDescription action={data?.category_details?.name}>
                  {data?.title ? (
                    <>
                      <Title>{data?.title}</Title>
                    </>
                  ) : null}
                  {data?.message}
                </ShortDescription>
                <Time>{timeAgo(data?.date_added)}</Time>
              </Description>
            </MainLeftContainer>
          </MainContainer>
        </>
      } */}
    </>
  );
}

export default NotificationCard;
const MainContainer = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background-color: ${({ action }) =>
    action === true ? "#FFFFFF" : "#eef2f6"};
  border-bottom: 1px solid #eef2f6;
  border-radius: 8px;
  margin-top: 4px;

  &:hover {
    cursor: pointer;
    background-color: ${({ action }) =>
      action === true ? "#FFFFFF" : "#f5f5f5"};
  }
  @media all and (max-width: 1024px) {
    padding: 14px 6px;
  }
  @media all and (max-width: 440px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0px;
  }
`;
const MainLeftContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
`;
const ContentDetail = styled.div`
  @media all and (max-width: 440px) {
    display: none;
  }
`;
const Content = styled.div`
  width: 50px;
  height: 50px;
  overflow: hidden;
  object-fit: contain;
  border-radius: 4px;
  img {
    width: 100%;
    height: 50px;
    display: block;
    object-fit: contain;
  }
`;
const NotificationIcons = styled.div`
  position: relative;
  max-width: 48px;
  width: 48px;
  max-height: 49px;
  height: 49px;
`;
const MainIcon = styled.div`
  width: 42px;
  height: 42px;
  overflow: hidden;
  object-fit: contain;
  border-radius: 70px;
  img {
    width: 100%;
    display: block;
  }
`;
const SecondaryIcon = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 24px;
  height: 24px;
  overflow: hidden;
  object-fit: contain;
  border-radius: 12px;
  img {
    width: 100%;
    height: 24px;
    display: flex;
  }
`;
const Description = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 416px;
  max-height: 68px;
`;
const Time = styled.span`
  font-family: "gordita_regular";
  font-weight: 400;
  font-size: 0.857rem;
  display: inline-block;
  line-height: 20px;
  color: #697586;
`;

const ShortDescription = styled.p`
  display: inline-block;
  gap: 4px;
  color: ${({ action }) =>
    action === "plan_expire_reminder" ? "#F04438" : "#364152"};
  font-size: 1rem;
  font-family: "gordita_regular";
  font-weight: ${({ action }) =>
    action === "plan_expire_reminder" ? 600 : 400};
`;
const Title = styled.strong`
  margin-right: 4px;
  display: inline-block;
  color: #364152;
  font-size: 1rem;
  font-family: "gordita_regular";
  font-weight: 600;
`;
const NotificationContent = styled.div`
  div {
    @media all and (max-width: 440px) {
      margin-left: 30px;
    }
  }
`;
