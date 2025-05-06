import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfileSectionSkeleton = () => {
  return (
    <MainContainer>
      <Container>
        <ProfileDiv>
          <ProfileLeftContainer>
            <PromImgWrap>
              <Skeleton circle width={150} height={150} />
            </PromImgWrap>
          </ProfileLeftContainer>
          <ProfileRightContainer>
            <Skeleton width={80} />
            <BottomContainer>
              <FlexContainer>
                <ButtonText>
                  <Skeleton width={120} />
                </ButtonText>
                <Id>
                  <Skeleton width={80} />
                </Id>
              </FlexContainer>
            </BottomContainer>
            <CountDiv>
              <CountNum>
                <Skeleton width={30} />
              </CountNum>
              <CountText>
                <Skeleton width={80} />
              </CountText>
              <CountNum>
                <Skeleton width={30} />
              </CountNum>
              <CountText>
                <Skeleton width={80} />
              </CountText>
              {Array.from({ length: 5 }, (_, index) => index)?.map(
                (item, index) => (
                  <MediaList href="#" target="blank" key={index}>
                    <Skeleton circle width={40} height={40} />
                  </MediaList>
                )
              )}
            </CountDiv>
          </ProfileRightContainer>
        </ProfileDiv>
      </Container>
    </MainContainer>
  );
};

export default ProfileSectionSkeleton;

const MainContainer = styled.div`
  padding-top: 32px;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  /* transform: translateY(-29px); */

  padding-bottom: 15px;
  border-bottom: 2px solid #e8e8e8;
  @media (max-width: 480px) {
    border-bottom: none;
  }
  @media (max-width: 360px) {
    margin-bottom: 0;
  }
`;

const ProfileLeftContainer = styled.div`
  margin-right: 12px;
  position: relative;
  /* border-radius: 50%; */
  @media (max-width: 640px) {
    /* margin-bottom: 10px; */
  }
  @media (max-width: 380px) {
    margin: 0 0 15px 0;
  }
  &.active {
    border: 4px solid #fec84b;
  }
  &.reject {
    border: 4px solid #d92d20;
  }
`;

const ProfileRightContainer = styled.div`
  padding-bottom: 5px;
`;
const Skill = styled.h2`
  font-size: 18px;
  font-family: "gordita_medium";
  margin-bottom: 6px;
  @media (max-width: 640px) {
    font-size: 16px;
  }
`;
const BottomContainer = styled.div`
  margin-bottom: 6px;
  display: flex;
  /* align-items: center; */
`;
const FlexContainer = styled.div`
  display: flex;
  align-items: center;

  div {
    background: #d1d1d6;
    border-radius: 50%;
    width: 7px;
    height: 7px;
    margin-right: 10px;
  }
`;
const ButtonText = styled.span`
  display: block;
  margin-right: 10px;
  font-size: 14px;
  border-radius: 6px;
  font-family: "gordita_medium";
  padding: 4px 10px;
  color: #344054;
`;
const Id = styled.span`
  display: block;
  font-size: 14px;
  color: #0fa76f;
  font-family: "gordita_medium";
`;

const MediaList = styled.a`
  display: block;
  margin-right: 25px;
  width: 32px;
  &:last-child {
    margin-right: 0;
  }
  @media (max-width: 980px) {
    width: 25px;
    height: 25px;

    overflow: hidden;
    height: 25px;
    display: flex;
    -webkit-box-pack: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  @media (max-width: 640px) {
    margin-right: 18px;
  }
  @media (max-width: 480px) {
    /* width: 28px; */
    /* margin-bottom: 24px; */
  }
  @media (max-width: 360px) {
  }
`;

const CountDiv = styled.div`
  display: flex;
  align-items: center;
`;
const CountNum = styled.h4`
  color: #27364b;
  font-family: "gordita_medium";
  margin-right: 4.5px;
`;
const CountText = styled.span`
  font-size: 14px;
  margin-right: 22px;
  &:last-child {
    margin-right: 0;
  }
`;

const ProfileDiv = styled.div`
  display: flex;
  align-items: center;
`;

const PromImgWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;

  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #fff;
  @media (max-width: 1280px) {
    height: 133px;
    width: 133px;
  }
`;
