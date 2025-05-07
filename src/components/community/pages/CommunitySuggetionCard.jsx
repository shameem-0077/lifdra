import React, { useEffect, useState } from "react";
import SuggestionProfileCard from "../components/SuggestionProfileCard";
import { useLocation } from "react-router-dom";
import useUserStore from "../../../store/userStore";
import { serverConfig } from "../../../axiosConfig";
import styled from "styled-components";

function CommunitySuggetionCard({ setFollowCount, setIsFollow, isFollow }) {
  const [isCardType, setCardType] = useState("suggestion");
  const [peopleMayYouKnow, setPeopleMayYouKnow] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const loginData = useUserStore((state) => state.loginData);
  const { accessToken } = loginData;

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    async function fetchPeopleMayYouKnow() {
      try {
        const response = await serverConfig.get(
          "/api/v1/users/community-profiles/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
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
    if (accessToken) {
      fetchPeopleMayYouKnow();
    }
    return () => {
      isMounted = false;
      setLoading(false);
    };
  }, [accessToken, location]);

  return (
    <>
      <SuggetionCardBox>
        {peopleMayYouKnow?.map((item) => (
          <SuggestionProfileCard
            type={"community"}
            key={item.id}
            setFollowCount={setFollowCount}
            item={item}
            setIsFollow={setIsFollow}
            isFollow={isFollow}
          />
        ))}
      </SuggetionCardBox>
    </>
  );
}

export default CommunitySuggetionCard;

const SuggetionCardBox = styled.div`
  width: 100%;
  flex-direction: row;
  display: flex;
  overflow-x: scroll;
  gap: 16px;
  margin-bottom: 24px;
  scroll-behavior: smooth;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
