import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function TechRevolution() {
  return (
    <Container>
      <ContentContainer>
        <Chip>
          <ChipText>Become a Tech Leader</ChipText>
        </Chip>
        <Title>Embrace the Tech Revolution!</Title>
        <Description>
          Connect, learn, and grow with engineers from across the globe.
          Together, let's drive innovation and make a lasting impact!
        </Description>
        <RegisterButton to="/?action=phone">Join Now</RegisterButton>
      </ContentContainer>
      <ImageContainer>
        <Image
          src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/layer_1.svg"
          alt="Tech Revolution"
        />
      </ImageContainer>
    </Container>
  );
}

export default TechRevolution;

const pxToRem = (px) => `${(px / 14).toFixed(2)}rem`;

const Container = styled.section`
  background: linear-gradient(
    180deg,
    rgba(228, 246, 250, 0.5) 0%,
    rgba(255, 253, 236, 0.5) 50%,
    rgba(233, 233, 233, 0.5) 100%
  );
  border-radius: ${pxToRem(40)};
  border: 1px solid rgba(227, 232, 239, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${pxToRem(80)} 0;
  @media all and (max-width: 580px) {
    margin: 2.71rem 0;
    border-radius: 1.86rem;
  }
  @media all and (max-width: 480px) {
    margin: 0px 0 20px 0;
  }
  @media all and (max-width: 360px) {
    border-radius: 1.1rem;
  }
`;

const ContentContainer = styled.div`
  padding: ${pxToRem(65)};
  @media all and (max-width: 768px) {
    padding: 3.64rem;
  }
  @media all and (max-width: 580px) {
    padding: 2.64rem;
  }
  @media all and (max-width: 480px) {
    padding: 1.64rem;
  }
`;

const Chip = styled.div`
  background: rgba(214, 245, 232, 1);
  border: 1px solid rgba(176, 234, 212, 1);
  width: max-content;
  padding: ${pxToRem(10)} ${pxToRem(15)};
  border-radius: ${pxToRem(30)};
`;

const ChipText = styled.h4`
  font-size: ${pxToRem(14)};
  font-family: "gordita_regular";
  font-weight: 600;
  color: rgba(12, 46, 64, 1);
`;

const Title = styled.h3`
  font-family: "gordita_regular";
  font-size: ${pxToRem(35)};
  font-weight: 600;
  text-align: left;
  margin: ${pxToRem(24)} 0;
  color: #000000;
  @media all and (max-width: 580px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  font-family: "gordita_regular";
  font-size: ${pxToRem(16)};
  margin-bottom: ${pxToRem(24)};
  color: #000000;
  font-family: 'gordita_medium' !important;
`;

const RegisterButton = styled(Link)`
  cursor: pointer;
  color: #000;
  font-size: ${pxToRem(14)};
  font-family: "gordita_medium";
  padding: 12px 20px;
  background: #064e38;
  width: max-content;
  border-radius: ${pxToRem(40)};
  color: #fff;
  display: inline-block;

`;

const ImageContainer = styled.div`
  align-self: flex-end;
  width: 60%;
  @media all and (max-width: 768px) {
    display: none;
  }
`;
const Image = styled.img`
  width: 100%;
  display: block;
`;
