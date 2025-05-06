import React, { Suspense, useEffect, useState } from "react";
import { Route, useLocation, Link, Routes, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

import PostMain from "../pages/PostMain";
import SharedPostMain from "../pages/SharedPostMain";
import PostSideBar from "../pages/PostSideBar";
import PostProfileRouter from "./PostProfileRouter";
import ListProfileModal from "../modals/ListProfileModal";
import {
  PostRouteRegex,
  ProfileRouteRegex,
  SavedRouteRegex,
  SinglePageRouteRegex,
} from "../components/RouteRegexPattern";
import ProfileCard from "../components/ProfileCard";
import { serverConfig } from "../../../axiosConfig";
import Skeleton from "react-loading-skeleton";
import TalropEdtechHelmet from "../../general/helpers/TalropEdtechHelmet";
import CommunityProfile from "../pages/CommunityProfile";
import ProfileSectionSkeleton from "../components/ProfileSectionSkeleton";
import UnfollowModal from "../modals/UnfollowModal";
import { useAuthStore } from "../../../store/authStore";

function CommunityRouter() {
  const { user_data, updateUserData } = useAuthStore();
  const access_token = user_data?.access_token;
  const divMainClass = user_data?.divMainClass;
  const location = useLocation();
  const isFeedRoute = location.pathname.includes('/feed');

  const [userProfileDetails, setUserProfileDetails] = useState({});
  const [inner, setInner] = useState(false);
  const [showSideBox, setShowSideBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showUnfollowModal, setShowUnfollowModal] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [followCount, setFollowCount] = useState({ follow: 0, follower: 0 });
  const [isModal, setModal] = useState(false);
  const [username, setUsername] = useState(null);
  const [profileData, setProfileData] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("following");
  const [myLearningData, setMyLearningData] = useState([]);
  const [mLstatus_code, setMLstatus_code] = useState(6001);

  useEffect(() => {
    let isMounted = true;

    async function fetchMyProfileDetails() {
      if (!access_token) return;
      
      setIsLoading(true);
      try {
        const response = await serverConfig.get(
          "/api/v1/users/community-profiles/",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            }
          }
        );
        const { status_code, data } = response.data;

        if (status_code === 6000 && isMounted) {
          setFollowCount({
            follow: data?.following || 0,
            follower: data?.followers || 0,
          });
          setUserProfileDetails(data || {});
          setIsFollow(data?.is_following || false);
          setUsername(data?.username);
          setProfileData(data);
          setTimeout(() => setIsVisible(true), 50);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchMyProfileDetails();

    return () => {
      isMounted = false;
    };
  }, [access_token]);

  useEffect(() => {
    document.body.classList.add("community");

    return () => {
      document.body.classList.remove("community");
    };
  }, []);

  // useEffect(() => {
  //   const fetchMyLrngsCardsData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const { data } = await serverConfig.get(
  //         "/learn/nano-degree-my-learning-progress/",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${access_token}`,
  //           },
  //         }
  //       );

  //       let { data: datas, status_code } = data;

  //       if (status_code !== 6000) {
  //         setMyLearningData([]);
  //         setIsLoading(false);
  //         setMLstatus_code(status_code);
  //       } else {
  //         setMyLearningData(datas);
  //         setIsLoading(false);
  //         setMLstatus_code(status_code);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching Mylearnings data:", error);
  //     }
  //   };

  //   fetchMyLrngsCardsData();
  // }, []);

  const ProfileCardSkeleton = () => (
    <Container>
      <SkeletonWrapper>
        <Skeleton
          circle
          width={78}
          height={78}
          style={{ marginBottom: "12px" }}
        />
        <Skeleton width={150} height={20} style={{ marginBottom: "10px" }} />
        <Skeleton width={100} height={16} style={{ marginBottom: "20px" }} />
        <Skeleton width={200} height={16} />
      </SkeletonWrapper>
    </Container>
  );

  console.log(location.pathname.match(SinglePageRouteRegex), "single page====");

  if (!access_token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div id="main">
      <ToastContainer />
      <TalropEdtechHelmet title={userProfileDetails?.name} />
      <ListProfileModal
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        username={username}
        setModal={setModal}
        isModal={isModal}
      />
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
          {/* {isLoading ? (
            <ProfileSectionSkeleton />
          ) : (
            <CommunityProfile
              userProfileDetails={userProfileDetails}
              followCount={followCount}
              setFollowCount={setFollowCount}
              setShowUnfollowModal={setShowUnfollowModal}
              showUnfollowModal={showUnfollowModal}
              isFollow={isFollow}
              setIsFollow={setIsFollow}
              setModal={setModal}
              myLearningData={myLearningData}
              mLstatus_code={mLstatus_code}
            />
          )} */}

          <LeftContainerBox inner={inner}>
            <Routes>
              <Route path="/" element={<PostMain />} />
              <Route path="/saved" element={<PostMain />} />
              <Route path="/:username" element={<CommunityProfile />} />
            </Routes>
          </LeftContainerBox>
        </MainContainer>
      </MainBoxContainer>
    </div>
  );
}

export default CommunityRouter;

const MainBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 0 20px;
`;

const LeftContainerBox = styled.div`
  width: 100%;
  max-width: 800px;
  position: relative;
`;

const Container = styled.div`
  border-radius: 8px;
  border: 1px solid #e3e8ef;
  overflow: hidden;
  margin-bottom: 24px;
`;

const SkeletonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 28px;
`;
