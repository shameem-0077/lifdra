import React from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

function NotificationSkeleton() {
  return (
    <>
      <MainConatiner>
        <Skeleton circle width={48} height={48} />
        <div style={{ width: "100%" }}>
          <Skeleton width="80%" height={16} />
          <Skeleton width="50%" height={16} />
        </div>
      </MainConatiner>
    </>
  );
}

export default NotificationSkeleton;
const MainConatiner = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
  padding: 16px 20px;
`;
