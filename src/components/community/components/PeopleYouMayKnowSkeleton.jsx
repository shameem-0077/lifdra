import React from "react";
import FollowBT from "./FollowBT";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";

const PeopleYouMayKnowSkeleton = () => {
  return (
    <>
      <SubContainer>
        <Skeleton circle width={50} height={50} />
        <NameBox>
          <UserName>
            <Skeleton width={100} height={14} />
          </UserName>
          <SubText>
            <Skeleton width={150} height={14} />
          </SubText>
        </NameBox>
        <Skeleton width={90} height={28} style={{ borderRadius: "8px" }} />
      </SubContainer>
    </>
  );
};

export default PeopleYouMayKnowSkeleton;
const ContentSection = styled.div`
  /* width: 100%; */

  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
`;

const SuggestionList = styled.div`
  width: 100%;

  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 32px;
  flex-wrap: wrap;
  flex-direction: initial;
  overflow-y: scroll;
  scroll-behavior: smooth;
  gap: 16px;
  justify-content: space-between;
  @media all and (max-width: 1440px) {
    justify-content: space-between;
  }
`;
const SubContainer = styled.div`
  max-width: 164px;
  height: 208px;
  min-width: 23%;
  border: 1px solid #e3e8ef;
  border-radius: 16px;
  flex-direction: column;
  display: flex;
  align-items: center;
  padding: 32px;
  gap: 16px;
`;

const PictureBox = styled.div`
  width: 56px;
  height: 56px;
`;

const NameBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  /* margin-bottom: 16px; */
`;

const UserName = styled.h4``;

const SubText = styled.p``;
