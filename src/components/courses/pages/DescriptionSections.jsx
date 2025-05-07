import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import useUserStore from "../../../store/userStore";

const DescriptionSections = ({ section }) => {
  const { user_profile } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleModal = () => {
    if (user_profile?.user_id) {
      navigate("/dashboard");
    } else {
      navigate({
        pathname: location.pathname,
        search: `action=login`,
      });
    }
  };

  return (
    <Container>
      <Wrapper>
        <LeftSection>
          <Title>Prime Program Features</Title>
          <Description>
            Our Prime Program offers a comprehensive learning experience with
            features designed to help you succeed:
          </Description>
          <FeatureList>
            <FeatureItem>
              <FeatureIcon>✓</FeatureIcon>
              <FeatureText>Access to all courses</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>✓</FeatureIcon>
              <FeatureText>Expert mentorship</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>✓</FeatureIcon>
              <FeatureText>Career guidance</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>✓</FeatureIcon>
              <FeatureText>Project-based learning</FeatureText>
            </FeatureItem>
          </FeatureList>
          <Button onClick={handleModal}>
            {user_profile?.user_id ? "Go to Dashboard" : "Join Now"}
          </Button>
        </LeftSection>
        <RightSection>
          <Image
            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/prime-program/features.png"
            alt="Prime Program Features"
          />
        </RightSection>
      </Wrapper>
    </Container>
  );
};

export default DescriptionSections;

const Container = styled.div`
  width: 100%;
  padding: 80px 0;
  background: #fff;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const LeftSection = styled.div`
  flex: 1;
  padding-right: 40px;
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 30px;
`;

const FeatureList = styled.div`
  margin-bottom: 30px;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const FeatureIcon = styled.span`
  width: 24px;
  height: 24px;
  background: #4ca473;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 14px;
`;

const FeatureText = styled.span`
  font-size: 16px;
  color: #333;
`;

const Button = styled.button`
  padding: 12px 30px;
  background: #4ca473;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #3d8b5f;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
`;
