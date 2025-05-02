import React from "react";
import styled from "styled-components";
import {
  check,
  verifedTick,
} from "../../../../../assets/icons/styep 3.0/icons";

const MeetButton = () => {
  return (
    <>
      <MainContainer>
        {/* <img src={verifedTick} alt="" /> */}
        {/* <img src={check} alt="" /> */}
        {/* <span>Registration successful!</span> */}
        <span>Join waiting list</span>
      </MainContainer>
    </>
  );
};

export default MeetButton;

const pxToRem = (px) => `${(px / 14).toFixed(2)}rem`;

const MainContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  span {
    font-family: "gordita_regular" !important;
    font-size: ${pxToRem(14)};
    font-weight: 600;
  }

  //join now
  //register

  /* background-color: #0FA76F;
    color: white;
    border: 1px solid #0FA76F;
    border-radius: 8px;
    font-family: "gordita_regular" !important;
    font-size: ${pxToRem(14)};
    letter-spacing: 1px; */

  //reg successfull
  /* border-radius: 24px;
  border: 1px solid #abefc6;
  background-color: #ecfdf3;
  color: #067647;
  gap: 4px;
  img{
    display: block;
  }
  span {
    font-family: "gordita_medium" !important;
    font-size: ${pxToRem(12)};
  } */

  //added waiting list
  /* gap: 4px;
  border-radius: 24px;
  border: 1px solid #abefc6;
  background-color: #ecfdf3;
  color: #067647;
  img{
    display: block;
  }
  span {
    font-family: "gordita_regular" !important;
    font-weight: 600 ;
    font-size: ${pxToRem(14)};
    letter-spacing: 0.5px;
  } */

  //Join waiting list
  border: 1px solid #abefc6;
  border-radius: 8px;
  color: #047853;
  cursor: pointer;
`;
