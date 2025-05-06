import React from "react";
import styled from "styled-components";

function Bento() {
  return (
    <Container>
      <Title>
        A Space for Engineers to <br /> Learn and Lead
      </Title>
      <BentoContainer>
        <BentoLeftContainer>
          <BentoItem className="secondary_explore">
            <TextContainer>
              <BentoTitle>Explore</BentoTitle>
              <BentoDescription>
                Grow technical skills with a wide range of structured courses
                and ongoing learning resources that support development and
                knowledge-building in Technology
              </BentoDescription>
            </TextContainer>
            <BentoImageContainer className="explore-imgcontainer">
              <BentoImage
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-10-2024/explore.svg"
                alt="Explore"
              />
            </BentoImageContainer>
          </BentoItem>
        </BentoLeftContainer>
        <BentoRightContainer>
          <BentoItem className="secondary engage">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                width: "100%",
              }}
            >
              <BentoTitle>Engage</BentoTitle>
              <BentoDescription>
                Connect and collaborate on our platform with a thriving
                community of expert engineers and peers. Work together on
                hands-on projects, share ideas, and engage in insightful
                discussions!
              </BentoDescription>
            </div>
            <BentoImageContainer className="engage-imgcontainer">
              <BentoImage
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-10-2024/engage.svg"
                alt="Explore"
              />
            </BentoImageContainer>
          </BentoItem>
          <BentoItem className="secondary evolve">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                width: "100%",
              }}
            >
              <BentoTitle>Evolve</BentoTitle>
              <BentoDescription>
                Unlock your potential by exploring the latest tech trends and
                innovations. Join engaging sessions and expert-led discussions
                to turn your dreams into reality and stay ahead of the curve.
              </BentoDescription>
            </div>
            <BentoImageContainer className="evolve-imgcontainer">
              <BentoImage
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-10-2024/evolve.svg"
                alt="Explore"
              />
            </BentoImageContainer>
          </BentoItem>
        </BentoRightContainer>
      </BentoContainer>
    </Container>
  );
}

export default Bento;

const pxToRem = (px) => `${(px / 14).toFixed(2)}rem`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 52px;
  padding: ${pxToRem(80)} 0;
  @media all and (max-width: 480px) {
    padding: 0 0 1.1rem;
  }
  @media all and (max-width: 360px) {
    padding: 0 0 1rem;
    gap: 0;
  }
`;

const Title = styled.h3`
  font-size: ${pxToRem(38)};
  color: #121926;
  /* font-size: 3.5rem !important; */
  /* margin-bottom: ${pxToRem(16)}; */
  font-family: "gordita_medium";
  text-align: center;
  /* margin-bottom: ${pxToRem(56)}; */
  font-size: clamp(${pxToRem(22)}, 3vw, ${pxToRem(38)});
  @media all and (max-width: 480px) {
    margin-bottom: 2rem;
  }
  @media all and (max-width: 360px) {
    font-size: 1.3rem;
  }
`;

const BentoContainer = styled.div`
  display: flex;
  gap: 28px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 28px;
  }
`;

const BentoLeftContainer = styled.div`
  max-width: 515px;
  width: 100%;
  border: 1px solid #e3e8ef;
  border-radius: 32px;
  @media (max-width: 1024px) {
    width: 100%;
    max-width: 100%;
    max-height: 260px;
  }
`;
const BentoRightContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 28px;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 435px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 100%;
    height: auto;
  }
  @media all and (max-width: 600px) {
    margin: 0;
  }
`;

const BentoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  background: #e7f8f0;
  padding-top: ${pxToRem(40)};
  /* padding: ${pxToRem(40)} 0 0 ${pxToRem(40)}; */
  /* width: 30%; */
  /* padding: ${pxToRem(40)}; */
  border-radius: ${pxToRem(32)};
  overflow: hidden;
  height: 100%;
  padding-left: 40px;
  padding-bottom: 40px;
  &.engage {
    background: #e8f0fb;
    flex-direction: row;
  }
  &.evolve {
    background: #f2edfb;
    flex-direction: row;
  }
  &.secondary_explore {
    padding-left: 0;
  }

  @media (max-width: 1024px) {
    flex-direction: row;
    max-height: 260px;
    &.secondary_explore {
      padding-left: 30px;
    }
  }
  @media all and (max-width: 680px) {
    padding: 24px;
  }
  @media all and (max-width: 480px) {
    padding: 1.6rem;
    border-radius: 1.9rem;
  }
  @media all and (max-width: 360px) {
    border-radius: 1.1rem;
  }
`;
const BentoTitle = styled.h4`
  font-size: ${pxToRem(22)} !important;
  font-family: "gordita_regular";
  font-weight: 700;
  color: #022c20;

  font-size: clamp(${pxToRem(18)}, 2.5vw, ${pxToRem(32)});
`;
const BentoDescription = styled.p`
  font-size: ${pxToRem(16)};
  font-family: "gordita_regular" !important;
  font-weight: 200;
  color: #364152;

  @media (max-width: 425px) {
    font-size: ${pxToRem(14)};
  }
`;
const BentoImageContainer = styled.div`
  position: relative;
  /* margin-top: ${pxToRem(40)}; */
  max-width: 477px;
  width: 100%;

  @media (max-width: 1024px) {
    width: 50%;
  }

  @media (max-width: 600px) {
    display: none;
  }

  &.explore-imgcontainer {
    margin-left: auto;
    top: 60px;
  }
  &.engage-imgcontainer {
    max-width: 402px;
    width: 100%;
  }
  &.evolve-imgcontainer {
    top: -40px;
  }
`;
const BentoImage = styled.img`
  width: 100%;
  height: 100%;

  display: block;
`;
