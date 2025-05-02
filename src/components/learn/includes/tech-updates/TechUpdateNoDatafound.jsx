import React from "react";
import styled from "styled-components";

function TechUpdateNoDatafound() {
  return (
    <MainContienr>
      <ImageContienr>
        <img
          src={require("../../../../assets/images/tech-update/No-data.jpg")}
          alt=""
        />
      </ImageContienr>
      <BottomContent>
        <h5>Blogs are coming soon!</h5>
        <p>In the meantime, explore articles on similar topics!</p>
      </BottomContent>
    </MainContienr>
  );
}

export default TechUpdateNoDatafound;
const MainContienr = styled.div``;
const ImageContienr = styled.div`
  width: 40%;
  margin: 0 auto;
  margin-bottom: 12px;
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
    font-size: 18px;
    font-family: "gordita_regular";
    text-align: center;
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
