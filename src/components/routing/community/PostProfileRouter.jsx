import React, { useState, Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { PrivateRoute } from "../PrivateRoute";
import PostProfile from "../../learn/screens/community/PostProfile";
import { Routes, Route, Navigate } from "react-router-dom";
import RouteLoading from "../RouteLoading";
import CommunityProfile from "../../learn/screens/community/CommunityProfile";
import PostMain from "../../learn/screens/community/PostMain";
import styled from "styled-components";
import PostSideBar from "../../learn/screens/community/PostSideBar";
import { accountsConfig } from "../../../axiosConfig";
import Loader from "../../learn/includes/techschooling/general/loaders/Loader";
import ProfileSectionSkeleton from "../../learn/includes/community/community-profile/ProfileSectionSkeleton";
import UnfollowModal from "../../learn/includes/community/modals/UnfollowModal";
import {
  PostRouteRegex,
  ProfilePostRedirctRegex,
  ProfileRouteRegex,
} from "../../learn/includes/community/RouteRegexPattern";

const PostProfileRouter = ({
  setFollowCount,
  followCount,
  toast,
  setModal,
  setUsername,
  username,
}) => {
  const { user_data } = useSelector((state) => state);
  const { access_token } = user_data;

  const [userProfileDetails, setUserProfileDetails] = useState({});
  const [inner, setInner] = useState(false);
  const [showSideBox, setShowSideBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showUnfollowModal, setShowUnfollowModal] = useState(false);
  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchMyProfileDetails() {
      setIsLoading(true);
      try {
        const response = await accountsConfig.get(
          "/api/v1/users/community-profiles/",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
            params: { student_id: username },
          }
        );
        const { status_code, data } = response.data;

        if (status_code === 6000) {
          if (isMounted) {
            setFollowCount({
              follow: data?.following,
              follower: data?.followers,
            });
            setUserProfileDetails(data);
            setIsFollow(data?.is_following);
            setIsLoading(false);
          }
        } else {
          if (isMounted) {
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    if (access_token) {
      fetchMyProfileDetails();
    }
    return () => {
      isMounted = false;
    };
  }, [access_token, username]);

  if (!access_token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <UnfollowModal
        openModal={showUnfollowModal}
        setOpenModal={setShowUnfollowModal}
        item={userProfileDetails}
        followCount={followCount}
        setFollowCount={setFollowCount}
        setIsFollow={setIsFollow}
        isFollow={isFollow}
      />
      <MainBoxContainer>
        <MainContainer>
          {isLoading ? (
            <ProfileSectionSkeleton />
          ) : (
            <PostProfile
              userProfileDetails={userProfileDetails}
              followCount={followCount}
              setFollowCount={setFollowCount}
              setShowUnfollowModal={setShowUnfollowModal}
              showUnfollowModal={showUnfollowModal}
              setIsFollow={setIsFollow}
              isFollow={isFollow}
              setModal={setModal}
            />
          )}

          <LeftContainerBox inner={inner}>
            <Routes>
              <Route path="/" element={<RouteLoading />} />
              <Route path="/:username" element={<CommunityProfile setUsername={setUsername} />} />
              <Route path="/post/:username" element={<PostMain userProfileDetails={userProfileDetails} setUsername={setUsername} toast={toast} />} />
              <Route path="/saved" element={<PostMain />} />
            </Routes>
          </LeftContainerBox>

          {!inner && (
            <RightContainerBox className={showSideBox && "active"}>
              <PostSideBar
                followCount={followCount}
                setFollowCount={setFollowCount}
                toast={toast}
                setModal={setModal}
                setUsername={setUsername}
              />
            </RightContainerBox>
          )}
        </MainContainer>
      </MainBoxContainer>
    </>
  );
};

export default PostProfileRouter;

const MainBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const MainContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 32px;
  justify-content: space-between;
  flex-wrap: wrap;
  @media all and (max-width: 1441px) {
    gap: 15px;
  }
`;

const LeftContainerBox = styled.div`
  width: ${({ inner }) => (inner ? "100%" : "65%")};
  position: relative;

  @media all and (max-width: 1080px) {
    width: 100%;
  }
`;

const RightContainerBox = styled.div`
  width: 30%;

  @media all and (max-width: 1080px) {
    width: 100%;
  }
`;

const LoaderCover = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const FadeInContent = styled.div`
  opacity: 0;
  animation: fadeIn 0.3s ease-in-out forwards;
  padding-top: 32px;
  width: 100%;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
