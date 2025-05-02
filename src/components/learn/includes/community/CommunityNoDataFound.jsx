import React from "react";
import styled from "styled-components";

const CommunityNoDataFound = ({ title, message, thumbnail }) => {
  return (
    <MainContainer>
      <ImageContainer>
        <img src={thumbnail} alt={title} />
      </ImageContainer>
      <BottomContent>
        <h5>{title}</h5>
        <p>{message}</p>
      </BottomContent>
    </MainContainer>
  );
};

export default CommunityNoDataFound;

const MainContainer = styled.div`
`;

const ImageContainer = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-bottom: 24px;
  @media all and (max-width: 980px) {
    width: 35%;
  }
  @media all and (max-width: 480px) {
    width: 29%;
  }
  img {
    display: block;
    width: 100%;
  }
`;
const BottomContent = styled.div`
  p {
    color: #949494;
    font-size: 16px;
    font-family: "gordita_regular";
    text-align: center;
    width: 70%;
    margin: 0 auto;

    @media all and (max-width: 980px) {
      font-size: 16px;
    }
    @media all and (max-width: 480px) {
      font-size: 14px;
    }
  }
  h5 {
    color: #4d4d4d;
    font-size: 24px;
    font-family: "gordita_medium";
    text-align: center;
    margin-bottom: 8px;
    @media all and (max-width: 768px) {
      font-size: 21px;
    }
    @media all and (max-width: 480px) {
      font-size: 18px;
    }
  }
`;
