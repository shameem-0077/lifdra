import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Box } from "@mui/material";

const ProfilePostSliderSkeleton = () => {
  return (
    <SliderContainer>
      <CardContainer>
        <Skeleton height={200} />
        <SkeletonContainer>
          <Skeleton height={20} width={150} />
          <Skeleton height={15} width={100} />
        </SkeletonContainer>
      </CardContainer>
    </SliderContainer>
  );
};

export default ProfilePostSliderSkeleton;

const SliderContainer = styled.div`
  width: 100%;
  padding: 20px 0;
`;

const CardContainer = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SkeletonContainer = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
