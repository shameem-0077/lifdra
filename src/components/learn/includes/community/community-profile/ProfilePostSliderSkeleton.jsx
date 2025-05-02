import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Box } from "@material-ui/core";

const ProfilePostSliderSkeleton = () => {
  return (
    <SliderContainer>
      <CardContainer>
        {Array.from({ length: 3 }, (_, index) => index)?.map((item, index) => (
          <Card>
            <UpdatedTime>
              <Skeleton />
            </UpdatedTime>
            <Description>
              <Skeleton count={3} />
            </Description>
            <ImageDiv>
              <Skeleton wrapper={Box} />
            </ImageDiv>
            <ActionContainer>
              <LikeBtn>
                <Skeleton width={20} height={20} />
              </LikeBtn>
              <LikeCount>
                <Skeleton width={20} height={20} />
              </LikeCount>
              <CommentBtn>
                <Skeleton width={20} height={20} />
              </CommentBtn>
              <CommentCount>
                <Skeleton width={20} height={20} />
              </CommentCount>
            </ActionContainer>
          </Card>
        ))}
      </CardContainer>
    </SliderContainer>
  );
};

export default ProfilePostSliderSkeleton;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
`;

const Card = styled.div`
  cursor: pointer;
  display: flex;
  width: 32%;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 1px 1rem -4px #e3e8ef;
  background: #ffffff;
  border-radius: 8px;
`;

const ImageDiv = styled.div`
  width: 100%;
  min-height: 140px;
  max-height: 140px;
  margin-top: 5px;
  display: flex;
  align-items: center;
`;

const Description = styled.p`
  width: 100%;
  height: 20%;
  font-size: 14px;
  padding: 5px 12px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 12px 16px 12px 16px;
  width: 100%;
`;
const LikeBtn = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
`;

const LikeCount = styled.h5`
  color: #757575;
  font-size: 14px;
  font-family: "gordita_medium";
  margin-right: 14px;
`;
const CommentCount = styled.h5`
  color: #757575;
  font-size: 14px;
  font-family: "gordita_medium";
`;

const CommentBtn = styled.div`
  display: flex;
  align-items: flex-start;
  border-radius: 8px;
`;

const UpdatedTime = styled.p`
  width: 100%;
  font-size: 12px;
  padding: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
