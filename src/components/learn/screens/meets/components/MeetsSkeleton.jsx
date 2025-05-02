import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Seats from "./Seats";

const MeetsSkeleton = () => {
  return (
    <>
      <MainCardContainer>
        <div>
          <ImgContainer>
            <Skeleton width="100%" height={167.63} />
          </ImgContainer>
        </div>

        <Right>
          <TimeAndDate>
            <Skeleton width="100%" height={30} />
          </TimeAndDate>

          <Title>
            <Skeleton width="100%" height={18} />
            <Skeleton width="40%" height={18} />
          </Title>

          <Container>
            <div style={{ display: "flex", gap: "24px" }}>
              <div>
                <Skeleton width={100} height={16} />

                <div style={{ display: "flex", gap: "4px" }}>
                  <Skeleton width={30} height={18} />
                </div>
              </div>

              <div>
                <Skeleton width={120} height={16} />
                <div style={{ display: "flex", gap: "4px" }}>
                  <Skeleton width={30} height={18} />
                </div>
              </div>
            </div>
            <div>
              <Skeleton width="100%" height={40} borderRadius={12} />
            </div>
          </Container>
        </Right>
      </MainCardContainer>
    </>
  );
};

export default MeetsSkeleton;

const MainCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1.6px solid #e3e8ef;
  background-color: #fcfcfd;
  border-radius: 16px;
  padding: 10px 10px 16px 10px;

  @media (max-width: 649px) {
    flex-direction: row;
  }
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const ImgContainer = styled.div`
  position: relative;
  border-radius: 8px;
  position: relative;
  width: 100%;
  height: 167.63px;
  overflow: hidden;
  @media (max-width: 649px) {
    width: 35vw;
    height: 154px;
  }
  @media (max-width: 500px) {
    width: 100%;
    height: 167.63px;
  }
`;

const TimeAndDate = styled.div`
  border-radius: 10px;
`;

const Title = styled.div`
  flex-grow: 1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Right = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-left: 8px;
  padding-right: 8px;
`;
