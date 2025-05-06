import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function PostCardSkeleton({ isLoading, initialLoading }) {
  return (
    <MainContainer>
      <Container>
        <CardTopSection>
          <UserProfileSkeleton>
            <Skeleton circle width={40} height={40} />
            <div>
              <Skeleton width={100} />
              <Skeleton width={80} />
            </div>
          </UserProfileSkeleton>
          <RightTop>
            <Skeleton width={80} />
            <OptionsSkeleton>
              <Skeleton circle width={20} height={20} />
            </OptionsSkeleton>
          </RightTop>
        </CardTopSection>
        <CardContentSection>
          <Skeleton count={3} />
          <MediaSection>
            <Skeleton height={200} />
          </MediaSection>
        </CardContentSection>
      </Container>
      <ActionSection>
        <Skeleton width={240} height={30} />
      </ActionSection>
    </MainContainer>
  );
}

export default PostCardSkeleton;

const MainContainer = styled.div`
  border: 1px solid #eef2f6;
  border-radius: 8px;
  margin-bottom: 32px;

  @media (max-width: 480px) {
    border-radius: 0;
  }

`;

const Container = styled.div`
  padding: 24px;
`;

const CardTopSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
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

const RightTop = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const OptionsSkeleton = styled.span`
  cursor: pointer;
`;

const CardContentSection = styled.div``;

const MediaSection = styled.div`
  margin-top: 24px;
`;

const ActionSection = styled.div`
  border-top: 1px solid #eef2f6;
  padding: 24px;
`;
