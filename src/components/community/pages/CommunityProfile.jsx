import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ContentBox from "../components/ContentBox";
import ProfilePost from "../components/ProfilePost";
import SkillsBox from "../components/SkillsBox";
import EducationBox from "../components/EducationBox";
import CertificateBox from "../components/CertificateBox";
import { serverConfig } from "../../../axiosConfig";
import ProfileAboutSectionSkeleton from "../components/ProfileAboutSectionSkeleton";
import UnfollowModal from "../modals/UnfollowModal";
import { useAuthStore } from "../../../store/authStore";

function CommunityProfile({ setUsername }) {
  const { username } = useParams();
  const [userProfileDetails, setUserProfileDetails] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [isModal, setModal] = useState(false);
  const { user_data } = useAuthStore();

  useEffect(() => {
    let isMounted = true;

    async function fetchMyProfileDetails() {
      if (!user_data?.access_token) {
        console.error("No access token available");
        return;
      }

      setLoading(true);
      try {
        const response = await serverConfig.get(
          `/api/v1/users/profile/`,
          {
            headers: {
              'Authorization': `Bearer ${user_data.access_token}`,
              'Content-Type': 'application/json'
            },
            params: { type: "about", student_id: username },
          }
        );
        const { status_code, data, message } = response.data;

        if (status_code === 6000) {
          if (isMounted) {
            setUserProfileDetails(data);
            setLoading(false);
          }
        } else {
          if (isMounted) {
            setUserProfileDetails({});
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("Error fetching profile details:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    if (user_data?.access_token) {
      if (typeof setUsername === 'function') {
        setUsername(username);
      }
      fetchMyProfileDetails();
    }

    return () => {
      isMounted = false;
    };
  }, [user_data?.access_token, username, setUsername]);

  return (
    <Container>
      {isLoading ? (
        <ProfileAboutSectionSkeleton />
      ) : (
        <LeftContainer>
          <FadeInContent>
            {userProfileDetails?.about_me ? (
              <ContentBox content={userProfileDetails?.about_me} />
            ) : (
              <></>
            )}
            <ProfilePost userId={userProfileDetails?.user_id} />
            <SkillsBox userProfileDetails={userProfileDetails} />
            <EducationBox userProfileDetails={userProfileDetails} />
            <CertificateBox userProfileDetails={userProfileDetails} />
          </FadeInContent>
        </LeftContainer>
      )}
    </Container>
  );
}

export default CommunityProfile;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 980px) {
    flex-wrap: wrap;
  }

  @media (max-width: 376px) {
    padding-top: 15px;
  }
`;
const LeftContainer = styled.div`
  width: 100%;
  padding-bottom: 32px;
`;

const FadeInContent = styled.div`
  opacity: 0;
  animation: fadeIn 0.3s ease-in-out forwards;
  /* padding-top: 32px; */
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 431px) {
    padding-top: 0;
  }
`;
