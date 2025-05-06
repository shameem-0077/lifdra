import React from "react";
import styled, { keyframes } from "styled-components";

const UserFollowSkeletonLoader = () => {
  return (
    <ProfileContainer>
      <DetailsSec>
        <InnerContainer>
          <ProfileIcon />
          <ProfileDiv>
            <UserNameSkeleton />
            <UserProgramSkeleton />
          </ProfileDiv>
        </InnerContainer>
        <FollowButtonSkeleton />
      </DetailsSec>
    </ProfileContainer>
  );
};

export default UserFollowSkeletonLoader;

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const SkeletonBackground = styled.div`
  background: #f6f7f8;
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 104px;
  display: inline-block;
  position: relative;
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${shimmer};
  animation-timing-function: linear;
`;

const ProfileContainer = styled.div`
  margin-bottom: 24px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailsSec = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileIcon = styled(SkeletonBackground)`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const ProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 0 16px;
`;

const UserNameSkeleton = styled(SkeletonBackground)`
  height: 18px;
  width: 120px;
  border-radius: 4px;
`;

const UserProgramSkeleton = styled(SkeletonBackground)`
  height: 14px;
  width: 80px;
  border-radius: 4px;
`;

const FollowButtonSkeleton = styled(SkeletonBackground)`
  height: 34px;
  width: 80px;
  border-radius: 8px;
`;
