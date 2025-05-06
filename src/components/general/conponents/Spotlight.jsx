import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";

function Spotlight() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleClick = () => {
    if (isAuthenticated) {
      navigate("/feed/");
    } else {
      navigate("/login/");
    }
  };

  return (
    <Container>
      <LogoContainer>
        <LogoSubText>An initiative from</LogoSubText>
        <LogoImageContainer>
          <h1>
            <LogoImage
              src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-10-2024/talrop-logo.svg"
              alt="Talrop Logo"
            />
          </h1>
        </LogoImageContainer>
      </LogoContainer>

      <TitleContainer>
        <Title>
          A Community-First Digital <br /> University Platform for <br />{" "}
          <TitleAccent>Tech Engineers & Scientists</TitleAccent>
        </Title>
      </TitleContainer>

      <Content>
        A digital university platform for students to learn and engage in
        technology, fostering future engineers and scientists.
      </Content>

      <RegisterButton onClick={handleClick}>
        {isAuthenticated ? "Go to Feed" : "Get Started"}
      </RegisterButton>

      <ElementImageContainer className="first-element">
        <ElementImage
          src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-10-2024/bracket.svg"
          alt="Bracket Element"
        />
      </ElementImageContainer>

      <ElementImageContainer className="second-element">
        <ElementImage
          src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-10-2024/code-block.svg"
          alt="Code Block Element"
        />
      </ElementImageContainer>

      <ElementImageContainer className="third-element">
        <ElementImage
          src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-10-2024/code-block.svg"
          alt="Code Block Element"
        />
      </ElementImageContainer>

      <ElementImageContainer className="fourth-element">
        <ElementImage
          src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-10-2024/bracket.svg"
          alt="Bracket Element"
        />
      </ElementImageContainer>

      {/* <ElementImageContainer className="bg-1-element">
        <ElementImage
          src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-10-2024/bg-1.svg"
          alt="Background Element 1"
        />
      </ElementImageContainer> */}

      <PlatformContainer>
        <PlatformImage
          src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-10-2024/platform.png"
          alt="Platform Image"
        />
      </PlatformContainer>
    </Container>
  );
}

export default Spotlight;

const pxToRem = (px) => `${(px / 14).toFixed(2)}rem`;

const Container = styled.section`
  padding: ${pxToRem(80)} 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  /* background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-10-2024/background.png"); */

  @media all and (max-width: 580px) {
    padding: 0;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LogoSubText = styled.h3`
  font-size: ${pxToRem(14)};
  color: #000;
  margin-bottom: ${pxToRem(16)};
  font-family: "gordita_medium";
`;
const LogoImageContainer = styled.div`
  width: 50%;
`;
const LogoImage = styled.img`
  width: 100%;
  display: block;
`;

const TitleContainer = styled.div`
  margin-top: ${pxToRem(58)};
  @media all and (max-width: 580px) {
    margin-top: 2.14rem;
  }
`;

const Title = styled.h1`
  font-family: "gordita_medium";
  font-weight: 600;
  text-align: center;
  color: #053321;
  font-size: clamp(${pxToRem(22)}, 4vw, ${pxToRem(58)});
  @media all and (max-width: 360px) {
    font-size: 1.58rem !important;
  }
`;

const TitleAccent = styled.span`
  font-family: "gordita_regular";
  font-weight: 600;
  color: #059664;

  font-size: clamp(${pxToRem(21)}, 4vw, ${pxToRem(58)});
`;

const Content = styled.p`
  font-size: ${pxToRem(16)};
  text-align: center;
  color: #364152;
  margin: ${pxToRem(24)} 0;

  @media (max-width: 1099px) {
    width: 75%;
  }
  @media (max-width: 600px) {
    font-size: ${pxToRem(14)};
  }
  @media (max-width: 425px) {
    width: 100%;
  }
`;

const RegisterButton = styled.button`
  cursor: pointer;
  color: #000;
  font-size: ${pxToRem(16)};
  font-family: "gordita_medium";
  padding: 14px 22px;
  background: #064e38;
  width: max-content;
  border-radius: ${pxToRem(40)};
  color: #fff;
  text-align: center;

  @media (max-width: 600px) {
    padding: ${pxToRem(10)} ${pxToRem(22)};
  }

  @media (max-width: 425px) {
    padding: ${pxToRem(6)} ${pxToRem(20)};
  }
`;

const ElementContainer = styled.div``;

const ElementImageContainer = styled.div`
  position: absolute;
  z-index: -1;

  @media (max-width: 600px) {
    display: none;
  }

  &.first-element {
    top: 10%;
    left: -7%;
    transform: scale(1.5);
  }
  &.second-element {
    bottom: 55%;
    right: -5%;
    transform: scale(1.5);
  }
  &.third-element {
    bottom: 50%;
    left: -5%;
    /* transform: scale(1.5); */
  }
  &.fourth-element {
    top: 5%;
    right: -5%;
    /* transform: scale(1.5); */
  }
  /* &.bg-1-element {
    filter: blur(6px);
    left: -5%;
    bottom: 0;
  } */
`;
const ElementImage = styled.img`
  width: 100%;
  display: block;
`;

const PlatformContainer = styled.div`
  /* background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-10-2024/background.png"); */
  margin: ${pxToRem(40)} 0;
  padding: 0 ${pxToRem(60)};

  @media (max-width: 600px) {
    padding: 0;
  }
`;

const PlatformImage = styled.img`
  width: 100%;
  display: block;
`;
