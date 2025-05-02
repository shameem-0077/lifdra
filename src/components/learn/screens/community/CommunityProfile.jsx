import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ContentBox from "../../includes/community/community-profile/ContentBox";
import ProfilePost from "../../includes/community/community-profile/ProfilePost";
import SkillsBox from "../../includes/community/community-profile/SkillsBox";
import EducationBox from "../../includes/community/community-profile/EducationBox";
import CertificateBox from "../../includes/community/community-profile/CertificateBox";
import { accountsConfig } from "../../../../axiosConfig";
import ProfileAboutSectionSkeleton from "../../includes/community/community-profile/ProfileAboutSectionSkeleton";
import UnfollowModal from "../../includes/community/modals/UnfollowModal";

function CommunityProfile({ setUsername }) {
  const { username } = useParams();
  const [userProfileDetails, setUserProfileDetails] = useState({});
  const [isLoading, setLoading] = useState(false);

  const [isModal, setModal] = useState(false);

  const {
    user_data: { access_token },
  } = useSelector((state) => state);

  useEffect(() => {
    let isMounted = true;

    async function fetchMyProfileDetails() {
      setLoading(true);
      try {
        const response = await accountsConfig.get(
          `/api/v1/users/community-profiles/`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
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
    if (access_token) {
      setUsername(username);
      fetchMyProfileDetails();
    }

    return () => {
      isMounted = false;
    };
  }, [access_token, username]);

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
