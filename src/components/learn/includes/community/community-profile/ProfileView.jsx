import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ProfileNavBar from "./ProfileNavBar";
import { accountsConfig } from "../../../../../axiosConfig";
import Jdenticon from "react-jdenticon";

function ProfileView({
  followCount,
  userProfileDetails,
  setFollowCount,
  setShowUnfollowModal,
  showUnfollowModal,
  setIsFollow,
  isFollow,
  setModal,
}) {
  const { user_profile } = useSelector((state) => state);
  const {
    user_data: { access_token },
  } = useSelector((state) => state);

  const handleCountClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setModal(true);
  };

  const [navData, setNavdata] = useState([
    {
      title: "Profile",
      url:
        userProfileDetails?.user_id == user_profile?.user_id
          ? "/feed/profile"
          : `/feed/profile/${userProfileDetails?.username}`,
    },
    {
      title: "Posts",
      url:
        userProfileDetails?.user_id == user_profile?.user_id
          ? "/feed/post"
          : `/feed/post/${userProfileDetails?.username}`,
    },
    {
      title: "Saved posts",
      url: `/feed/saved`,
    },
  ]);

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
            follower: prevCount.follower + 1,
          }));
          setIsFollow(true);
        } else if (message?.message === "Unfollowed") {
          setFollowCount((prevCount) => ({
            ...prevCount,
            follower: prevCount.follower - 1,
          }));
          setIsFollow(false);
        }
      }
    } catch (error) {
      console.error("Error updating follow:", error);
      setIsFollow(!isFollow);
    }
  };

  const renderSocialMedias = () => {
    return (
      <>
        {userProfileDetails?.social_media?.map((item) => (
          <MediaList href={item?.media_url} target="blank" key={item.id}>
            <Linkedin src={item?.media_logo?.logo} alt="linkedinImage" />
          </MediaList>
        ))}
      </>
    );
  };

  useEffect(() => {
    if (user_profile?.user_id != userProfileDetails?.user_id) {
      const updatedNavData = [...navData];
      updatedNavData.pop();
      setNavdata(updatedNavData);
    }
    if (userProfileDetails?.is_following) {
      setIsFollow(true);
    }
  }, []);

  return (
    <>
      <Container>
        <ProfileContainer>
          <ProfileDiv>
            <ProfileLeftContainer>
              <PromImgWrap>
                {userProfileDetails.photo ? (
                  <ProfilePic
                    src={userProfileDetails.photo}
                    alt={userProfileDetails.name}
                  />
                ) : (
                  <Jdenticon
                    // size={window.innerWidth > 1280 ? "170" : "133"}
                    value={userProfileDetails.name}
                  />
                )}
              </PromImgWrap>
              <ProfileLeftBox>
                <ProfileTopBox>
                  <Skill>{userProfileDetails?.name} </Skill>
                  <FlexContainer
                    isHide={userProfileDetails?.social_media?.length <= 0}
                  >
                    <div></div>
                    <Id>ID: #{userProfileDetails?.user_id}</Id>
                  </FlexContainer>
                </ProfileTopBox>
                <DesignationContainer>
                  <Designationbox>
                    <Designation>{userProfileDetails?.designation}</Designation>
                  </Designationbox>
                </DesignationContainer>
              </ProfileLeftBox>
            </ProfileLeftContainer>
            <ProfileRightContainer>
              <TopContainer>
                <ProfileTopBox>
                  <Skill>{userProfileDetails?.name} </Skill>
                  <FlexContainer
                    isHide={userProfileDetails?.social_media?.length <= 0}
                  >
                    <div></div>
                    <Id>ID: #{userProfileDetails?.user_id}</Id>
                  </FlexContainer>
                </ProfileTopBox>
                <DesignationContainer>
                  <Designationbox>
                    <Designation>{userProfileDetails?.designation}</Designation>
                  </Designationbox>
                </DesignationContainer>
              </TopContainer>
              <BottomBoxContainer>
                <BottomContainer
                  isHide={userProfileDetails?.social_media?.length <= 0}
                >
                  <EditFollowActionDiv
                    isActive={
                      window.innerWidth <= 768 && window.innerWidth > 500
                    }
                  >
                    {/* {user_profile?.user_id == userProfileDetails?.user_id ? (
                      <EditBtnContainer>
                        {window.innerWidth <= 560 ? (
                          <EditBtn to="/profile/">
                            <EditImg>
                              <img src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/edit.svg" />
                            </EditImg>
                          </EditBtn>
                        ) : (
                          <EditBtn to="/profile/">
                            <EditImg>
                              <img src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/edit.svg" />
                            </EditImg>
                            <BtnText>Edit profile</BtnText>
                          </EditBtn>
                        )}
                      </EditBtnContainer>
                    ) : (
                      <FollowButton
                        onClick={() =>
                          !isFollow
                            ? updateFollow(userProfileDetails?.id)
                            : setShowUnfollowModal(true)
                        }
                        isActive={isFollow}
                      >
                        {isFollow ? "Following" : "Follow"}
                      </FollowButton>
                    )} */}
                  </EditFollowActionDiv>
                </BottomContainer>
                <CountDiv>
                  <>
                    <ButtonContainer onClick={handleCountClick}>
                      <CountNum>
                        {userProfileDetails?.user_id == user_profile?.user_id
                          ? userProfileDetails?.followers
                          : followCount?.follower}
                      </CountNum>
                      <CountText>
                        {userProfileDetails?.followers === 1
                          ? "Follower"
                          : "Followers"}
                      </CountText>
                    </ButtonContainer>
                    <ButtonContainer onClick={handleCountClick}>
                      <CountNum>
                        {userProfileDetails?.user_id == user_profile?.user_id
                          ? followCount?.follow
                          : userProfileDetails?.following}
                      </CountNum>
                      <CountText>Following</CountText>
                    </ButtonContainer>
                  </>
                  <SocialMediaContainer isActive={window.innerWidth >= 640}>
                    {renderSocialMedias()}
                  </SocialMediaContainer>
                </CountDiv>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <EditFollowActionDiv isActive={window.innerWidth <= 500}>
                    {user_profile?.user_id == userProfileDetails?.user_id ? (
                      <EditBtnContainer>
                        {window.innerWidth <= 500 ? (
                          <EditBtn to="/profile/">
                            <EditImg>
                              <img src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/edit.svg" />
                            </EditImg>
                          </EditBtn>
                        ) : (
                          <EditBtn to="/profile/">
                            <EditImg>
                              <img src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/edit.svg" />
                            </EditImg>
                            <BtnText>Edit profile</BtnText>
                          </EditBtn>
                        )}
                      </EditBtnContainer>
                    ) : (
                      <FollowButton
                        onClick={() =>
                          !isFollow
                            ? updateFollow(userProfileDetails?.id)
                            : setShowUnfollowModal(true)
                        }
                        isActive={isFollow}
                      >
                        {isFollow ? "Following" : "Follow"}
                      </FollowButton>
                    )}
                  </EditFollowActionDiv>
                  <SocialMediaContainer isActive={window.innerWidth < 640}>
                    {renderSocialMedias()}
                  </SocialMediaContainer>
                </div>
              </BottomBoxContainer>
            </ProfileRightContainer>
          </ProfileDiv>
          <EditFollowActionDiv isActive={window.innerWidth > 500}>
            {user_profile?.user_id == userProfileDetails?.user_id ? (
              <EditBtnContainer>
                <EditBtn to="/profile/">
                  <EditImg>
                    <img src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/edit.svg" />
                  </EditImg>
                  <BtnText>Edit profile</BtnText>
                </EditBtn>
              </EditBtnContainer>
            ) : (
              <FollowButton
                onClick={() =>
                  !isFollow
                    ? updateFollow(userProfileDetails?.id)
                    : setShowUnfollowModal(true)
                }
                isActive={isFollow}
              >
                {isFollow ? "Following" : "Follow"}
              </FollowButton>
            )}
          </EditFollowActionDiv>
        </ProfileContainer>
        <ProfileNavBar navData={navData} />
      </Container>
    </>
  );
}

export default ProfileView;

const Container = styled.div``;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  /* transform: translateY(-29px); */

  padding-bottom: 15px;
  border-bottom: 2px solid #e8e8e8;
  @media (max-width: 480px) {
    width: 100%;
    border-bottom: none;
  }
  @media (max-width: 360px) {
    margin-bottom: 0;
  }
`;
const ProfileLeftContainer = styled.div`
  margin-right: 12px;
  position: relative;
  /* border-radius: 50%; */
  @media (max-width: 640px) {
    /* margin-bottom: 10px; */
  }
  @media all and (max-width: 480px) {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  @media (max-width: 380px) {
    margin: 0 0 15px 0;
  }
  &.active {
    border: 4px solid #fec84b;
  }
  &.reject {
    border: 4px solid #d92d20;
  }
`;
const MyProfilePic = styled.div`
  min-width: 142px;
  max-width: 142px;
  overflow: hidden;
  border-radius: 50%;
  min-height: 142px;
  max-height: 142px;
  position: relative;
  border: 5px solid #fff;
  box-shadow: 0px 4px 6px -2px #10182808;
  box-shadow: 0px 12px 16px -4px #10182814;
  display: flex;

  @media (max-width: 980px) {
    min-width: 126px;
    max-width: 126px;
    min-height: 126px;
    max-height: 126px;
  }
  /* @media (max-width: 768px){
     
    } */
  @media (max-width: 640px) {
    min-width: 116px;
    max-width: 116px;
    min-height: 116px;
    max-height: 116px;
  }
`;
const ProfilePic = styled.img`
  width: 100%;
  display: block;
  object-fit: contain;
`;
const ProfileRightContainer = styled.div`
  padding-bottom: 5px;
  flex-direction: column;
  gap: 12px;
  @media all and (max-width: 480px) {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: start;
  }
`;
const TopContainer = styled.div`
  @media all and (max-width: 480px) {
    display: none;
  }
`;

const BottomBoxContainer = styled.div`
  width: 100%;
  display: flex;
  @media all and (max-width: 612px) {
    flex-direction: column;
  }
`;
const ProfileLeftBox = styled.div`
  display: none;
  @media all and (max-width: 480px) {
    display: block;
  }
`;
const ProfileTopBox = styled.div`
  display: flex;
  gap: 12px;

  @media all and (max-width: 480px) {
    flex-direction: column;
    gap: 0;
    margin-bottom: 2px;
  }
`;
// const Data = styled.div`
//   display: "flex";
//   gap: 12px;

//   @media all and (max-width: 480px) {
//     flex-direction: column;
//     gap: 0;
//     margin-bottom: 10px;
//   }
// `;

const DesignationContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;

  @media all and (max-width: 360px) {
    flex-direction: column;
    align-items: flex-start;
  }
  @media (max-width: 1024px) {
    margin-bottom: 6px;
  }
  @media all and (max-width: 612px) {
    margin-bottom: 0;
  }
`;
const EditButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;
const Designationbox = styled.div`
  width: fit-content;
  /* padding: 4px 12px; */
  /* border: 1px solid #cdd5df; */
  /* border-radius: 8px; */
  /* box-shadow: 0px 1px 2px 0px #1018280d; */

  /* @media all and (max-width: 360px) {
    padding: 4px 6px;
  } */
`;
const Designation = styled.p`
  color: #344054;
  font-size: 14px;
  font-family: "gordita_regular";
  font-weight: 600;

  @media all and (max-width: 360px) {
    font-size: 0.87rem;
  }
`;
const Skill = styled.h2`
  font-size: 18px;
  font-family: "gordita_medium";
  margin-bottom: 6px;
  @media (max-width: 640px) {
    font-size: 18px;
  }
`;
const BottomContainer = styled.div`
  /* margin-bottom: 6px; */
  display: flex;
  /* align-items: center; */
`;
const FlexContainer = styled.div`
  display: flex;
  align-items: center;

  @media all and (max-width: 360px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  div {
    background: #d1d1d6;
    border-radius: 50%;
    width: 7px;
    height: 7px;
    margin-right: 10px;

    @media all and (max-width: 360px) {
      display: none;
    }
  }
`;
const ButtonText = styled.span`
  display: block;
  margin-right: 10px;
  font-size: 14px;
  border: 1px solid #d0d5dd;
  border-radius: 6px;
  font-family: "gordita_medium";
  padding: 4px 10px;
  color: #344054;

  @media (max-width: 431px) {
    font-size: 12px;
  }
`;
const Id = styled.span`
  display: block;
  font-size: 14px;
  color: #0fa76f;
  font-family: "gordita_medium";

  @media (max-width: 431px) {
    font-size: 12px;
  }
  @media (max-width: 420px) {
    /* font-size: 10px; */
  }
`;
const SocialMediaContainer = styled.div`
  display: ${(props) => (props.isActive ? "flex" : "none")};
  align-items: center;
  width: 100%;
  flex-wrap: inherit;
  gap: 16px;

  @media (max-width: 640px) {
    /* margin-top: 10px; */
  }
`;
const AddButton = styled.div`
  cursor: pointer;
  width: 32px;
  height: 32px;
  @media (max-width: 980px) {
    /* width: 25px;
        height: 25px; */
  }
`;
const Add = styled.img`
  width: 100%;
  display: block;
`;
const MediaList = styled.a`
  display: block;
  /* margin-right: 25px; */
  width: 32px;
  &:last-child {
    margin-right: 0;
  }
  @media (max-width: 980px) {
    width: 25px;
    height: 25px;

    overflow: hidden;
    height: 25px;
    display: flex;
    -webkit-box-pack: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  @media (max-width: 800px) {
    flex-wrap: wrap;
    /* margin-right: 18px; */
  }
  @media (max-width: 640px) {
    /* margin-right: 18px; */
  }
  @media (max-width: 431px) {
    width: 20px;
  }
`;

const Linkedin = styled.img`
  width: 100%;
  display: block;
  object-fit: contain;
`;
const CountDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  @media (max-width: 640px) {
    /* flex-wrap: wrap; */
  }
`;
const CountNum = styled.h4`
  color: #27364b;
  font-family: "gordita_medium";
  margin-right: 4.5px;
`;
const CountText = styled.span`
  font-size: 14px;
  margin-right: 22px;
  &:last-child {
    margin-right: 0;
  }
`;
const EditBtnContainer = styled.div`
  width: fit-content;
  /* @media all and (max-width: 480px) {
    display: none;
  } */
`;
const EditBtn = styled(Link)`
  display: flex;
  align-items: flex-start;
  justify-content: baseline;
  cursor: pointer;
  padding: 14px 20px 12px 20px;
  gap: 10px;
  border-radius: 8px;
  opacity: 0px;
  border: 2px solid #0fa76f;
  color: #059664;
  box-shadow: 0px 1px 2px 0px #1018280d;
  @media all and (max-width: 681px) {
    padding: 14px 10px;
  }

  @media (max-width: 1024px) {
    padding: 5px 5px;
    /* margin-left: 10px; */
  }

  @media (max-width: 540px) {
    padding: 5px 5px;
    margin-left: 0;
  }
`;
const ProfileDiv = styled.div`
  display: flex;
  align-items: center;
  @media all and (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
  }
`;
const EditImg = styled.span`
  width: 20px;
  height: 20px;
  img {
    display: inline-block;
    width: 100%;
    height: 20px;
  }
`;
const BtnText = styled.small`
  padding: 0px 2px 0px 2px;
  font-size: 16px;
  font-family: "gordita_medium";
`;

const LoaderCover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const PromImgWrap = styled.div`
  display: flex;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  /* width: 160px;
  height: 160px; */
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(227, 232, 239, 1);

  background-color: #fff;
  /* @media (max-width: 1280px) {
    height: 133px;
    width: 133px;
  } */

  @media all and (max-width: 768px) {
    /* height: 100px;
    width: 100px; */
    height: 72px;
    width: 72px;
  }
`;

const FollowButton = styled.button`
  padding: 0 12px;
  background: #059664;
  border-radius: 8px;
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

  @media (max-width: 460px) {
    /* padding: 0 70px; */
    margin: 5px 0;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 22px;
  cursor: pointer;

  @media all and (max-width: 360px) {
    margin-right: 6px;
  }
  &:last-child {
    margin-right: 0;
  }
`;

const EditFollowActionDiv = styled.div`
  display: ${(props) => (props.isActive ? "block" : "none")};
  @media (max-width: 760px) {
    /* margin-left: 10px; */
  }

  @media (max-width: 460px) {
    margin-left: 0;
  }
`;
