import React from "react";
import styled from "styled-components";

function NoData() {
  return (
    <MainContienr>
      <ImageContienr>
        <img
          //   src={require("../../../../assets/images/tech-update/No-data.jpg")}
          alt=""
        />
      </ImageContienr>
      <BottomContent>
        <h5>No data found!</h5>
      </BottomContent>
    </MainContienr>
  );
}

export default NoData;
const MainContienr = styled.div`
  padding: 100px;
`;
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
    font-size: 15px;
    font-family: "gordita_medium";
    text-align: center;
    margin-bottom: 8px;
  }
`;
