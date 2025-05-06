import React from 'react'
import Skeleton from 'react-loading-skeleton';
import styled from "styled-components";


const SuggestionSkeleton = () => {
  return (
    <ProfileContainer>
      <DetailsSec>
        <ProfileNav>
          <ProfileIcon>
            <Skeleton circle width={40} height={40 } style={{borderRadius: "50%"}}/>
          </ProfileIcon>
        </ProfileNav>
        <RightSec>
          <ProfileDiv>
            <UserName>
                <Skeleton width={100} height={14} />
            </UserName>
            <UserProgram>
                <Skeleton width={150} height={14} />
            </UserProgram>
          </ProfileDiv>
          <FollowActionDiv>
            <Skeleton width={90} height={28} style={{ borderRadius: "8px" }} />
          </FollowActionDiv>
        </RightSec>
      </DetailsSec>
      {/* <Learn></Learn> */}
    </ProfileContainer>
  )
}

export default SuggestionSkeleton


const ProfileContainer = styled.div`
  &:last-child {
    margin-bottom: 0;
  }
`;

const FollowButton = styled.button`
  padding: 0 12px;
  background: #059664;
  border-radius: 8px;
  display: block;
  height: 34px;
  font-size: 14px;
  width: fit-content;
  color: #ffffff;
  cursor: pointer;
  font-family: "gordita_medium";
  transition: transform 0.2s ease-in-out, background 0.3s, color 0.3s,
    border 0.3s;

  :hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.95);
  }

  ${(props) =>
    props.isActive &&
    `
    border: 1px solid #cdd5df;
    background: #ffffff;
    color: #364152;
  `}
`;

const RightSec = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;
  @media all and (max-width: 1240px) {
    font-size: 0.857rem;
  }
  @media all and (max-width: 1180px) {
    font-size: 1rem;
    flex-direction: column;
  }

  @media all and (max-width: 820px) {
    flex-direction: column;
  }
`;
const ProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  /* @media all and (max-width: 1080px) {
    width: 50%;
    text-overflow: ellipsis;
  }

  @media all and (max-width: 1100px) {
    width: 100%;
  } */
`;

const FollowActionDiv = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ProfileIcon = styled.div`
  /* height: 40px;
  width: 40px;
  border-radius: 50%;
  overflow: hidden; */
`;

const UserName = styled.h2`
  color: #0c1024;
  font-size: 14px;
  font-family: "gordita_medium";

  white-space: pre-wrap;
  text-overflow: ellipsis;
  display: inline-block;
  vertical-align: top;
  width: 100%;
  margin: 0 !important;

  @media all and (max-width: 1100px) {
    font-size: 14px;
  }
`;

const UserProgram = styled.h4`
  color: #697586;
  font-size: 14px;
  margin: 0 !important;
  @media all and (max-width: 1025px) {
    font-size: 13px;
  }
`;

const DetailsSec = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  @media all and (max-width: 1280px) {
    align-items: flex-start;
  }
`;

const PromImgWrap = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ProfilePic = styled.img`
  width: 100%;
  display: block;
  object-fit: contain;
`;

const ProfileNav = styled.div`
  display: flex;
`;