import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";

const PrimeSpotlight = () => {
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
          <Title>Prime Program</Title>
          <Description>
            Prime Program is a comprehensive learning platform designed to help
            students excel in their academic and professional journey. Our program
            offers a wide range of courses, mentorship, and resources to help you
            achieve your goals.
          </Description>
          <Button onClick={handleModal}>
            {user_profile?.user_id ? "Go to Dashboard" : "Join Now"}
          </Button>
        </LeftSection>
        <RightSection>
          <Image
            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/prime-program/prime-spotlight.png"
            alt="Prime Program"
          />
        </RightSection>
      </Wrapper>
    </Container>
  );
};

export default PrimeSpotlight;

const Container = styled.div`
  width: 100%;
  padding: 80px 0;
  background: #f8f9fa;
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

const Title = styled.h1`
  font-size: 48px;
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

const Button = styled.button`
  padding: 12px 30px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #0056b3;
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
