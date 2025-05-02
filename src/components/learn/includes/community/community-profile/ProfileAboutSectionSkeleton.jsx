import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfileAboutSectionSkeleton = () => {
  return (
    <Container>
      <LeftContainer>
        <BioBox>
          <Heading>
            <Skeleton width={60} />
          </Heading>
          <Content>
            <Skeleton count={5} />
          </Content>
        </BioBox>
      </LeftContainer>
    </Container>
  );
};

export default ProfileAboutSectionSkeleton;

const Container = styled.div`
  background: #f9f9fb;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 32px;
  width: 100%;
`;

const LeftContainer = styled.div`
  width: 100%;
`;

const BioBox = styled.div`
  background: #f9f9fb;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 32px;
  width: 100%;
`;

const Heading = styled.h4`
  font-size: 16px;
  margin-bottom: 14px;
  font-family: "gordita_medium";
  color: #2d2d2d;
  @media (max-width: 640px) {
    font-size: 15px;
  }
`;

const Content = styled.p``;
