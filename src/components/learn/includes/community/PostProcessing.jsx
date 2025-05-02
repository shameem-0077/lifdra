import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PostActions from "./PostActions";
import PostCardSkeleton from "./PostCardSkeleton";
import UserProfile from "./UserProfile";
import moment from "moment";
import PostCardContent from "./PostCardContent";

function PostProcessing({ item, setFollowCount }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const currentTime = moment();

  return (
    <MainContainer>
      <FadeInContent>
        <Container>
          <CardTopSection>
            <UserProfile item={item} setFollowCount={setFollowCount} />
            <RightTop>
              <Time>
                {moment.utc(item?.date_updated).fromNow(currentTime)} ago
              </Time>
            </RightTop>
          </CardTopSection>
          <CardContentSection>
            <PostCardContent item={item} />
            <MediaSection>
              <VideoProcessingLoader>
                <LoaderSpinner />
                <LoaderText>Processing video...</LoaderText>
              </VideoProcessingLoader>
            </MediaSection>
          </CardContentSection>
        </Container>
        <ActionSection>
          <PostActions item={item} />
        </ActionSection>
      </FadeInContent>
    </MainContainer>
  );
}

export default PostProcessing;

const glowAnimation = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(5, 150, 100, 1);
  }
  50% {
    box-shadow: 0 0 20px rgba(5, 150, 100, 1);
  }
  100% {
    box-shadow: 0 0 5px rgba(5, 150, 100, 1);
  }
`;

const MainContainer = styled.div`
  border: 1px solid #eef2f6;
  border-radius: 8px;
  margin-bottom: 32px;
`;

const UserProfileSkeleton = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;

const ProcessingTitle = styled.div`
  background-color: rgba(5, 150, 100, 1);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-family: "gordita_regular";
  font-weight: bold;
  animation: ${glowAnimation} 2s infinite;
`;

const OptionsSkeleton = styled.span`
  cursor: pointer;
`;

const FadeInContent = styled.div`
  opacity: 0;
  animation: fadeIn 0.3s ease-in-out forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Container = styled.div`
  padding: 16px;

  @media (min-width: 768px) {
    padding: 24px;
  }
`;

const CardTopSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
`;

const RightTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const Time = styled.span`
  color: #9aa4b2;
  font-size: 14px;
  margin-right: 8px;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const Options = styled.span`
  padding: 8px;
  cursor: pointer;
  img {
    width: 20px;
    height: 20px;
    display: block;
  }
`;

const CardContentSection = styled.div``;

const MediaSection = styled.div`
  margin-top: 16px;

  @media (min-width: 768px) {
    margin-top: 24px;
  }
`;

const ActionSection = styled.div`
  border-top: 1px solid #eef2f6;
`;

const ImageViewContainer = styled.div`
  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 8px;
  }
`;
const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const VideoProcessingLoader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  min-height: 50vh;
`;

const LoaderSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #e0e0e0;
  border-top: 4px solid #059664;
  border-radius: 50%;
  animation: ${spinAnimation} 1s linear infinite;
`;

const LoaderText = styled.p`
  margin-top: 12px;
  font-size: 14px;
  color: #666;
`;
