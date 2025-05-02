import React from "react";
import { infoCircle } from "../../../../../assets/icons/styep 3.0/icons";
import styled from "styled-components";

const MeetMessage = ({message}) => {
  return (
    <>
      <MainContainer>
        <img src={infoCircle} alt="" />
        <p>
          {message}
        </p>
      </MainContainer>
    </>
  );
};

export default MeetMessage;

const pxToRem = (px) => `${(px / 14).toFixed(2)}rem`;

const MainContainer = styled.div`
  display: flex;
  padding: 4px 6px;
  gap: 8px;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #EEF2F6;
  border-radius: 8px;

  img{
    display: block;
  }

  p {
    font-family: "gordita_regular";
    font-size: ${pxToRem(12)};
    color: #475467;
  }
`;
