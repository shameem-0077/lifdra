import React from "react";
import styled, { keyframes } from "styled-components";
import NodataIcon from "../../../../../assets/icons/notification/Component 219/fi_9744811.svg";
function Nodata({ activeTab }) {
  return (
    <>
      <MainCatainer>
        <ImageBox>
          <ImageContainer className={activeTab ? "active" : ""}>
            <img
              src={
                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-11-2024/emptystate_notification.svg"
              }
              alt="No Data"
            />
          </ImageContainer>
        </ImageBox>
        <ContantBox>
          No new notifications for you right now. Feel free to come back and
          check later.
        </ContantBox>
      </MainCatainer>
    </>
  );
}

export default Nodata;

const MainCatainer = styled.div`
  padding: 48px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
  border-bottom: 1px solid #fcfcfd;
  max-width: 1000px;
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ImageContainer = styled.div`
  width: 100%;
  &.active {
    width: 300px;
  }
  img {
    width: 100%;
    display: block;
  }
`;
const ContantBox = styled.p`
  text-align: center;
  font-family: "gordita_regular";
  font-size: 1rem;
  font-weight: 400;
  line-height: 22px;
  color: #364152;
`;
