import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SuggestionCard from "../components/SuggestionCard";
import { serverConfig } from "../../../axiosConfig";
import {
  PostRouteRegex,
  ProfilePostRedirctRegex,
  ProfileRouteRegex,
  SavedRouteRegex,
} from "../components/RouteRegexPattern";

function PostSideBar({ setFollowCount, followCount, setModal, setUsername }) {
  const location = useLocation();
  const { user_data } = useAuthStore();
  const { access_token } = user_data;

  const [profileData, setProfileData] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchProfile() {
      try {
        const response = await serverConfig.get(
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

  return (
    <ContentBox
      isInsideProfile={
        location.pathname.match(ProfileRouteRegex) ||
        location.pathname.match(PostRouteRegex) ||
        location.pathname.match(SavedRouteRegex)
          ? true
          : false
      }
    >
      <SuggestionCard setFollowCount={setFollowCount} />
    </ContentBox>
  );
}

export default PostSideBar;

const ContentBox = styled.section`
  /* position: relative; */
  position: sticky;
  top: 0px;
  /* padding: 32px 0px 0px; */
  background-color: #fff;
  max-height: calc(100vh - 80px);
  z-index: 2;
  overflow-y: scroll;
  /* padding-top: 32px; */
  &::-webkit-scrollbar {
    display: none;
  }

  @media all and (max-width: 1080px) {
    /* padding: 32px 0px 0px; */
  }
  @media all and (max-width: 1024px) {
    padding: 0px 0px 0px;
  }
  @media all and (max-width: 980px) {
    width: 100%;
  }
  @media all and (max-width: 768px) {
    /* padding: 15px; */
  }
  @media all and (max-width: 690px) {
    width: ${({ isInsideProfile }) => (isInsideProfile ? "100%" : "129%")};
    /* padding: 6px 20px 0px; */
  }
  @media all and (max-width: 640px) {
    /* min-height: calc(100vh - 60px); */
    width: 100%;
    /* min-height: ${({ isInsideProfile }) =>
      isInsideProfile ? "none" : "100vh"}; */
  }
`;

const Container = styled.div`
  border-radius: 8px;
  border: 1px solid #e3e8ef;
  overflow: hidden;
  margin-bottom: 24px;
`;

const SkeletonWrapper = styled.div`
  padding: 28px;
`;

const FadeInContainer = styled.div`
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;
