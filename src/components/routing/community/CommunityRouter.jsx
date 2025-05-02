import React, { Suspense, useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Route, useLocation, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import RouteLoading from "../RouteLoading";
import PostMain from "../../learn/screens/community/PostMain";
import SharedPostMain from "../../learn/screens/community/SharedPostMain";
import PostSideBar from "../../learn/screens/community/PostSideBar";
import PostProfileRouter from "./PostProfileRouter";
import ListProfileModal from "../../learn/includes/community/modals/ListProfileModal";
import {
  PostRouteRegex,
  ProfileRouteRegex,
  SavedRouteRegex,
  SinglePageRouteRegex,
} from "../../learn/includes/community/RouteRegexPattern";
import ProfileCard from "../../learn/includes/community/community-sidebox/ProfileCard";
import { accountsConfig, learnConfig } from "../../../axiosConfig";
import Skeleton from "react-loading-skeleton";
import InProgressCard from "../../learn/screens/nano-degree/components/in-progress/InProgressCard";
import TalropEdtechHelmet from "../../helpers/TalropEdtechHelmet";

function mapStateToProps(state) {
  return {
    divMainClass: state.divMainClass,
  };
}

function mapDispatchtoProps(dispatch) {
  return {
    updateActiveMenu: (active_menu) =>
      dispatch({
        type: "ACTIVE_MENU",
        active_menu: active_menu,
      }),
  };
}

function CommunityRouter(props) {
  const [showSideBox, setShowBox] = useState(false);
  const [inner, setInner] = useState(false);
  const [isModal, setModal] = useState(false);
  const [username, setUsername] = useState(null);
  const user_data = useSelector((state) => state.user_data);
  const { access_token } = user_data;
  const [profileData, setProfileData] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("following");
  const location = useLocation();
  const [followCount, setFollowCount] = useState({
    follow: 0,
    follower: 0,
  });
  const [myLearningData, setMyLearningData] = useState([]);
  const [mLstatusCode, setMLStatusCode] = useState(6001);

  useEffect(() => {
    let isMounted = true;
    async function fetchProfile() {
      try {
        const response = await accountsConfig.get(
          `/api/v1/users/community-profiles/`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        const { status_code, data, message } = response.data;

        if (status_code === 6000 && isMounted) {
          setUsername(data?.username);
          setFollowCount({
            follow: data?.following,
            follower: data?.followers,
          });
          setProfileData(data);
          setLoading(false);
          setTimeout(() => setIsVisible(true), 50);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      }
    }

    fetchProfile();

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

  useEffect(() => {
    const fetchMyLrngsCardsData = async () => {
      setLoading(true);
      try {
        const { data } = await learnConfig.get(
          "/learn/nano-degree-my-learning-progress/",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        let { data: datas, status_code } = data;

        if (status_code !== 6000) {
          setMyLearningData([]);
          setLoading(false);
          setMLStatusCode(status_code);
        } else {
          setMyLearningData(datas);
          setLoading(false);
          setMLStatusCode(status_code);
        }
      } catch (error) {
        console.error("Error fetching Mylearnings data:", error);
      }
    };

    fetchMyLrngsCardsData();
  }, []);

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

  return (
    <div id="main">
      <ToastContainer />
      <TalropEdtechHelmet title={profileData?.name} />
      <ListProfileModal
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        username={username}
        setModal={setModal}
        isModal={isModal}
      />
      <MainContainer>
        {location.pathname === "/feed/" ||
        location.pathname.match(SinglePageRouteRegex) ? (
          <>
            <LeftContainerBox>
              <ContentBox
                isInsideProfile={
                  location.pathname.match(ProfileRouteRegex) ||
                  location.pathname.match(PostRouteRegex) ||
                  location.pathname.match(SavedRouteRegex)
                    ? true
                    : false
                }
              >
                {isLoading ? (
                  <ProfileCardSkeleton />
                ) : (
                  <FadeInContainer isVisible={isVisible}>
                    <ProfileCard
                      setActiveTab={setActiveTab}
                      followCount={followCount}
                      profileData={profileData}
                      setModal={setModal}
                    />
                  </FadeInContainer>
                )}
                {location.pathname === "/feed/" && (
                  <InPrograsBox>
                    {myLearningData && myLearningData.length > 0 && (
                      <InProgressCard
                        key={0}
                        type={"feed"}
                        progressData={myLearningData[0]}
                      />
                    )}
                  </InPrograsBox>
                )}
              </ContentBox>
            </LeftContainerBox>

            <CentetrContainerBox inner={inner}>
              <Suspense fallback={<RouteLoading />}>
                <Route
                  exact
                  path="/feed/"
                  render={() => (
                    <PostMain toast={toast} setFollowCount={setFollowCount} />
                  )}
                />
              </Suspense>
              <Suspense>
                <Route
                  exact
                  path="/feed/view/:slug"
                  render={() => (
                    <SharedPostMain
                      toast={toast}
                      setFollowCount={setFollowCount}
                    />
                  )}
                />
              </Suspense>
            </CentetrContainerBox>
            {location.pathname.match(ProfileRouteRegex) ? (
              <></>
            ) : (
              <>
                {!inner && (
                  <RightContainerBox className={showSideBox && "active"}>
                    <PostSideBar
                      setFollowCount={setFollowCount}
                      followCount={followCount}
                      toast={toast}
                      setModal={setModal}
                      setUsername={setUsername}
                    />
                  </RightContainerBox>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <Suspense fallback={<RouteLoading />}>
              <Route
                exact
                path="/feed/*"
                render={() => (
                  <PostProfileRouter
                    setFollowCount={setFollowCount}
                    followCount={followCount}
                    toast={toast}
                    setModal={setModal}
                    setUsername={setUsername}
                    username={username}
                  />
                )}
              />
            </Suspense>
          </>
        )}
      </MainContainer>
      {/* ) : (
          <UnAutharisedPage />
        ) */}
      {/* ) : (
        <RouteLoading />
      )} */}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchtoProps)(CommunityRouter);

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const LeftContainerBox = styled.div`
  max-width: 268px;
  width: 19.94%;
  @media all and (max-width: 1180px) {
    width: 24%;
  }
  @media all and (max-width: 1064px) {
    width: 28%;
  }
  @media all and (max-width: 840px) {
    width: 32%;
  }

  @media all and (max-width: 768px) {
    display: none;
  }
`;
const ContentBox = styled.section`
  /* position: relative; */
  position: sticky;
  display: flex;
  flex-direction: column;
  gap: 24px;
  top: 0px;
  /* padding: 32px 0px 0px; */
  background-color: #fff;
  /* height: calc(100vh - 80px); */
  z-index: 2;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  @media all and (max-width: 980px) {
    width: ${({ isInsideProfile }) => (isInsideProfile ? "100%" : "100%")};

    /* padding: ${({ isInsideProfile }) =>
      isInsideProfile ? "0" : "26px  0px"}; */
  }
  @media all and (max-width: 768px) {
    padding: 15px;
  }
  @media all and (max-width: 690px) {
    width: ${({ isInsideProfile }) => (isInsideProfile ? "100%" : "129%")};
    padding: 6px 20px 0px;
  }
  @media all and (max-width: 640px) {
    /* min-height: calc(100vh - 60px); */
    width: 100%;
    min-height: ${({ isInsideProfile }) =>
      isInsideProfile ? "none" : "100vh"};
  }
`;
const InPrograsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const SuggestionPeopeleCard = styled.div`
  display: none;
  @media all and (max-width: 1024px) {
    display: block;
  }
`;
const CentetrContainerBox = styled.div`
  width: ${({ inner }) => (inner ? "100%" : "48.81%")};
  position: relative;
  &:after {
    content: "";
    top: 400px;
    right: 0;
    width: 20px;
    height: 500px;
    background: #000;
  }
  @media all and (max-width: 1180px) {
    width: ${({ inner }) => (inner ? "100%" : "48%")};
  }
  @media all and (max-width: 1064px) {
    width: 70%;
  }
  @media all and (max-width: 840px) {
    width: 66%;
  }
  @media all and (max-width: 768px) {
    width: ${({ inner }) => (inner ? "100%" : "100%")};
  }
  @media all and (max-width: 640px) {
    width: ${({ inner }) => (inner ? "100%" : "100%")};
  }
`;

const RightContainerBox = styled.div`
  max-width: 372px;
  width: 27.68%;
  @media all and (max-width: 1180px) {
    width: 24%;
  }
  @media all and (max-width: 1064px) {
    display: none;
  }
`;

const FadeInContainer = styled.div`
  max-width: 268px;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
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
