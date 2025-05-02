import React from "react";
import styled from "styled-components";

function MeetNoData() {
  return (
    <Container>
      <ImgContainer>
        <img
          src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-02-2024/Guid+image.svg"
          alt="No Data"
        />
      </ImgContainer>
      <SubTitle>
      Sessions will be available shortly! Check back soon for exciting sessions to join!
      </SubTitle>
    </Container>
  );
}

export default MeetNoData;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ImgContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 32px 0;

  img {
    width: 100%;
    height: auto;
    max-width: 100%;
    display: block;
  }

  @media only screen and (min-width: 768px) {
    img {
      width: 75%;
    }
  }
`;
const SubTitle = styled.h4`
  color: #101828;
  font-family: "gordita_medium" !important;
  font-size: 20px;
  text-align: center;
  line-height: 1.6;
  @media only all and (max-width: 768px) {
    font-size: 18px;
  }
  @media only all and (max-width: 480px) {
    font-size: 14px;
  }
  @media only all and (max-width: 370px) {
    font-size: 13px;
  }
`;
