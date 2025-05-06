import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../../store/authStore";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { serverConfig } from "../../../axiosConfig";
import SuggestionProfileCard from "./SuggestionProfileCard";

function SuggestionCard({ setFollowCount, setIsFollow, isFollow }) {
  const [peopleMayYouKnow, setPeopleMayYouKnow] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const location = useLocation();
  const { user_data } = useAuthStore();
  const { access_token } = user_data;

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    async function fetchPeopleMayYouKnow() {
      try {
        const response = await serverConfig.get(
          "/api/v1/users/community-profiles/",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
            params: { type: "people_may_you_know", count: 5 },
          }
        );
        const { status_code, data } = response.data;
        if (status_code === 6000 && isMounted) {
          setPeopleMayYouKnow(data);
          setLoading(false);
          setTimeout(() => setIsVisible(true), 50);
        } else if (isMounted) {
          setPeopleMayYouKnow([]);
          setLoading(false);
          isVisible && setIsVisible(false);
        }
      } catch (error) {
        console.error("Error fetching people you may know:", error);
        if (isMounted) {
          setPeopleMayYouKnow([]);
          setLoading(false);
        }
      }
    }
    if (access_token) {
      fetchPeopleMayYouKnow();
    }
    return () => {
      isMounted = false;
      setLoading(false);
    };
  }, [access_token, location]);

  const SuggestionCardSkeleton = () => (
    <>
      <CardTop>
        <Skeleton width={150} height={20} style={{ marginBottom: "6px" }} />
        <Skeleton width={200} height={16} />
      </CardTop>
      <CardBottom>
        {[...Array(3)].map((_, index) => (
          <ProfileContainer key={index}>
            <DetailsSec>
              <Skeleton circle width={50} height={50} />
              <ProfileDiv>
                <Skeleton
                  width={100}
                  height={18}
                  style={{ marginBottom: "4px" }}
                />
                <Skeleton width={80} height={14} />
              </ProfileDiv>
            </DetailsSec>
            <Skeleton width={80} height={34} style={{ borderRadius: "8px" }} />
          </ProfileContainer>
        ))}
      </CardBottom>
    </>
  );

  return peopleMayYouKnow?.length > 0 ? (
    <Container>
      {isLoading ? (
        <SuggestionCardSkeleton />
      ) : (
        <FadeInContainer isVisible={isVisible}>
          {peopleMayYouKnow?.length > 0 && (
            <CardTop>
              <Title>People you may know</Title>
              {/* <SubTitle>From your same program</SubTitle> */}
            </CardTop>
          )}
          {/* <PeopleYouMayKnowModal
            isModal={modalOpen}
            handleCloseModal={() => setModalOpen(false)}
            access_token={access_token}
            peopleMayYouKnow={peopleMayYouKnow}
            setFollowCount={setFollowCount}
            setIsFollow={setIsFollow}
            isFollow={isFollow}
            setPeopleMayYouKnow={setPeopleMayYouKnow}
            setModal={setModalOpen}
          /> */}
          <CardBottom>
            {peopleMayYouKnow?.map((item) => (
              <SuggestionProfileCard
                type={"suggestion"}
                key={item.id}
                setFollowCount={setFollowCount}
                item={item}
                setIsFollow={setIsFollow}
                isFollow={isFollow}
              />
            ))}
          </CardBottom>
          {/* <ViewButton onClick={(e) => setModalOpen(true)}>View All</ViewButton> */}
        </FadeInContainer>
      )}
    </Container>
  ) : null;
}

export default SuggestionCard;

const Container = styled.div`
  border: 1.6px solid #eef2f6;
  border-radius: 12px;
  width: 100%;
  padding: 20px;

  @media all and (max-width: 1180px) {
    padding: 14px;
  }

  @media all and (max-width: 1080px) {
    padding: 14px;
  }
`;

const CardTop = styled.div`
  /* border-bottom: 1px solid #eef2f6; */
  /* padding: 24px 32px 16px; */

  /* @media all and (max-width: 1280px) {
        padding: 24px 10px 16px;
    }

    @media all and (max-width: 1024px) {
        padding: 14px;
    } */
`;

const Title = styled.h4`
  color: #202939;
  font-size: 18px;
  font-family: "gordita_medium";
  margin-bottom: 24px;
`;

const SubTitle = styled.p`
  font-size: 14px;
  color: #697586;
`;

const CardBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 11px;
`;

const ViewButton = styled.button`
  font-size: 14px;
  width: fit-content;
  color: #0fa76f;
  cursor: pointer;
  font-family: "gordita_medium";
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DetailsSec = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileDiv = styled.div`
  margin: 0 16px;
`;

const FadeInContainer = styled.div`
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  width: 100%;
`;
