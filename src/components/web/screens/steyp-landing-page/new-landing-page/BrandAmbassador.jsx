import React from "react";
import styled from "styled-components";
import Banner from "../../../../../assets/images/newlandingpage/banner-background.png";

function BrandAmbassador() {
  return (
    <Container>
      <Content>
        <Left>
          <h4>
            Our <span>Brand Ambassador</span>
          </h4>
          <Heading>
            Megastar{" "}
            <img
              src={
                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/Mammootty.png"
              }
              alt="Mammootty"
            />
          </Heading>
          <Img
            src={
              "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/line.svg"
            }
            alt="line"
          />
        </Left>
        <Right>
          <ImageContainer>
            <img
              src={
                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/banner.png"
              }
              alt="Mammootty"
            />
          </ImageContainer>
        </Right>
        <Decoration>
          <img
            src={
              "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/round.svg"
            }
            alt="Image"
          />
        </Decoration>
      </Content>
    </Container>
  );
}

export default BrandAmbassador;
const Container = styled.div`
  padding: 70px 0;
  @media all and (max-width: 1280px) {
    padding: 40px 0;
  }
  @media all and (max-width: 1080px) {
    padding: 30px 0;
  }
  @media all and (max-width: 480px) {
    padding: 0px 0;
  }
`;
const Content = styled.div`
  width: 90%;
  margin: 0 auto;
  background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-08-2022/banner-background.png");
  border-radius: 8px;
  height: 40vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media all and (max-width: 768px) {
    height: 40vh;
  }
  @media all and (max-width: 480px) {
    height: 25vh;
  }
`;
const Left = styled.div`
  width: 78%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
  @media all and (max-width: 480px) {
    transform: translateY(-40px);
    width: 90%;
  }
  h4 {
    color: #fff;
    font-family: "gordita_medium";
    font-size: 30px;
    @media all and (max-width: 1080px) {
      font-size: 28px;
    }
    @media all and (max-width: 980px) {
      font-size: 26px;
    }
    @media all and (max-width: 768px) {
      font-size: 24px;
    }
    @media all and (max-width: 640px) {
      font-size: 19px;
    }
    @media all and (max-width: 480px) {
      font-size: 18px;
    }
    span {
      color: #0e9f6a;
      font-family: "gordita_medium";
    }
  }
`;
const Right = styled.div``;
const Heading = styled.h3`
  display: flex;
  justify-content: left;
  align-items: center;
  color: #fff;
  font-family: "gordita_regular";
  font-size: 28px;
  margin-top: 5px;
  @media all and (max-width: 1080px) {
    font-size: 24px;
  }
  @media all and (max-width: 768px) {
    font-size: 23px;
  }
  @media all and (max-width: 640px) {
    font-size: 19px;
  }
  @media all and (max-width: 480px) {
    font-size: 18px;
  }
  img {
    width: 270px;
    display: block;
    margin-left: 10px;
    transform: translateY(3px);
    @media all and (max-width: 1280px) {
      width: 250px;
    }
    @media all and (max-width: 1080px) {
      width: 230px;
    }
    @media all and (max-width: 980px) {
      transform: translateY(2px);
      width: 211px;
    }
    @media all and (max-width: 768px) {
      width: 190px;
    }
    @media all and (max-width: 640px) {
      width: 166px;
    }
    @media all and (max-width: 480px) {
      width: 151px;
    }
  }
`;
const ImageContainer = styled.div`
  width: 310px;
  position: absolute;
  right: 110px;
  bottom: 4px;
  @media all and (max-width: 1280px) {
    width: 238px;
    position: absolute;
    right: 26px;
    bottom: 4px;
  }
  @media all and (max-width: 768px) {
    width: 200px;
  }
  @media all and (max-width: 640px) {
    width: 140px;
    right: 3px;
  }
  @media all and (max-width: 480px) {
    width: 100px;
    right: 5px;
    bottom: 0px;
  }
  img {
    display: block;
    width: 100%;
  }
`;
const Img = styled.img`
  width: 270px;
  position: absolute;
  top: 87px;
  left: 140px;
  @media all and (max-width: 1280px) {
    width: 250px;
  }
  @media all and (max-width: 1080px) {
    width: 221px;
    left: 121px;
    top: 82px;
  }
  @media all and (max-width: 980px) {
    width: 209px;
    top: 77px;
  }
  @media all and (max-width: 768px) {
    width: 181px;
    top: 70px;
  }
  @media all and (max-width: 640px) {
    left: 101px;
    width: 160px;
    top: 60px;
  }
  @media all and (max-width: 640px) {
    left: 96px;
    width: 141px;
    top: 57px;
  }
`;
const Decoration = styled.div`
  width: 169px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  img {
    width: 100%;
    display: block;
  }
  @media all and (max-width: 1280px) {
    width: 130px;
  }
  @media all and (max-width: 980px) {
    width: 116px;
  }
  @media all and (max-width: 768px) {
    width: 70px;
  }
`;
