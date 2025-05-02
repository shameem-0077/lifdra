import React, { useEffect, useState } from "react";
import styled from "styled-components";
import $ from "jquery";
import { Link, useHistory, useLocation } from "react-router-dom";

function VacationPopup({ popup, setPopup, handlePopupClick }) {
  return (
    <>
      <ModalContainer>
        <Container>
          <img
            class="w3-container w3-center w3-animate-opacity"
            src={
              "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/popup-banner.png"
            }
            alt="Image"
          />
          <CloseButton
            onClick={() => {
              setPopup(false);
              handlePopupClick(true);
            }}
          >
            <CloseIcon
              src={
                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/19-03-2022/close.svg"
              }
            />
          </CloseButton>
          <Button to="/mlp/vacation-program/" onClick={() => setPopup(false)}>
            Join Now
          </Button>
        </Container>
      </ModalContainer>
      <PopModalContainer>
        {/* <Overlay
                    style={{
                        display: "block",
                    }}
                ></Overlay> */}
        <BackContainer
          style={{
            transform: "scale(1,1)",
          }}
        >
          <MobileContainer>
            <Close
              onClick={() => {
                setPopup(false);
                handlePopupClick(true);
              }}
            >
              <CloseIcon
                src={
                  "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/19-03-2022/close.svg"
                }
              />
            </Close>
            <BannerImgMobile
              src={
                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/banner-mobile.png"
              }
              alt="Image"
            />
            <ButtonSection>
              <JoinButton
                to="/mlp/vacation-program/"
                onClick={() => setPopup(false)}
              >
                Join Now
              </JoinButton>
              <EnquiryButton href="tel:+91 858 999 8874" type="phone">
                <small>For Enquiry</small>
                <p>+91 858 999 8874</p>
              </EnquiryButton>
            </ButtonSection>
          </MobileContainer>
        </BackContainer>
      </PopModalContainer>
    </>
  );
}

export default VacationPopup;

const PopModalContainer = styled.div`
  display: none;
  @media all and (max-width: 480px) {
    display: block;
    animation: 1s ease 2s normal forwards 1 fadein;
    -webkit-animation: 1s ease 2s normal forwards 1 fadein;
    opacity: 0;
    visibility: hidden;
    position: relative;
    z-index: 9999;
  }

  @keyframes fadein {
    from {
      opacity: 0;
      visibility: hidden;
    }
    to {
      opacity: 1;
      visibility: visible;
    }
  }

  @-webkit-keyframes fadein {
    from {
      opacity: 0;
      visibility: hidden;
    }
    to {
      opacity: 1;
      visibility: visible;
    }
  }
`;
const BackContainer = styled.div`
  position: fixed;
  transform: scale(0, 0);
  transition: 0.3s;
  width: 100%;
  height: 100vh;
  z-index: 1;
  left: 0;
  top: 0px;
  background: #0000006b;
`;
// const Overlay = styled.div`
//     position: fixed;
//     left: 0;
//     top: 0px;
//     width: 100%;
//     height: 100vh;
//     background: rgba(0, 0, 0, 0.2);
//     z-index: 999;
//     display: none;
// `;
const MobileContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  transform: translate(-50%, -50%);
  text-align: center;
  background-color: rgb(255, 255, 255);
  padding: 55px 40px 40px;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 5px;
  z-index: 1;

  transition: all 0.3s ease 0s;
  width: 340px;
  padding: 5px 15px 15px;

  @media (max-width: 390px) {
    width: 300px;
  }
  @media (max-width: 385px) {
    width: 300px;
  }
  @media (max-width: 340px) {
    width: 285px;
  }
`;
const ButtonSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  bottom: 12%;
  left: 10%;
  flex-direction: column;
  align-items: flex-start;
`;
const JoinButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: #ffff;
  color: #2334a7;
  font-family: gordita_medium;
  width: 160px;
  height: 50px;
  margin-bottom: 6px;
  border-radius: 6px;
  font-size: 14px;

  border-image: radial-gradient(
      70950.82% 43315.42% at 31.52% 121.15%,
      #0fa76f 100%,
      #0fa76f17 9%,
      #ffffff80 50%
    ),
    linear-gradient(#0fa76f 100%, #0fa76f17 9%, #ffffff80 50%);
  border-image-slice: 1;

  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
const EnquiryButton = styled.a`
  color: #2334a7;
  border: 2px solid #eb9e4b;
  display: flex;
  background-color: #f3f9eb;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 160px;
  height: 50px;
  font-size: 14px;
  border-radius: 6px;
  padding-left: 10px;

  small {
    color: #2334a7;
    font-size: 12px !important;
    padding-top: 3px;
  }
  p {
    color: #2334a7;
    font-size: 14px !important;
    font-family: "gordita_medium" !important;
    margin-top: -1px;
  }
`;
const Close = styled.div`
  width: 35px;
  height: 35px;
  position: absolute;
  right: -15px;
  top: -10px;
  cursor: pointer;
  img {
    width: 30px !important;
    @media all and (max-width: 340px) {
      width: 28px !important;
    }
  }
`;
const BannerImgMobile = styled.img`
  display: none;
  @media all and (max-width: 480px) {
    width: 100%;
    display: block;
    border-radius: 18px;
  }
`;
const ModalContainer = styled.div`
  position: fixed;
  bottom: 55px;
  left: 26px;
  border-radius: 11px;
  pointer-events: auto;
  z-index: 10000;
  display: flex;
  right: auto;
  align-items: center;
  gap: 20px;
  animation: slide-box 0.6s ease;

  @keyframes slide-box {
    0% {
      left: -300px;
    }
    100% {
      left: 26px;
    }
  }
  @media all and (max-width: 480px) {
    display: none;
  }
`;
const Container = styled.div`
  width: 400px;
  position: relative;
  img {
    width: 100%;
    display: block;
  }
  @media (max-width: 768px) {
    width: 350px;
  }
  @media (max-width: 480px) {
    width: 250px;
  }
`;

const CloseButton = styled.div`
  width: 35px;
  height: 35px;
  position: absolute;
  right: -14px;
  top: 24px;
  cursor: pointer;
  @media all and (max-width: 480px) {
    top: 10px;
  }
`;
const CloseIcon = styled.img`
  position: absolute;
  top: 0px;
  border-radius: 50%;
  margin: 0px;
  padding: 6px;
  box-shadow: rgb(0 0 0 / 16%) 0px 3px 6px, rgb(0 0 0 / 23%) 0px 3px 6px;
  width: 28px !important;
  display: flex !important;
  background: rgb(255, 255, 255);
  right: 5px;
  @media all and (max-width: 480px) {
    width: 26px !important;
  }
`;
const Button = styled(Link)`
  position: absolute;
  bottom: 12%;
  left: 10%;
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: #ffff;
  color: #2334a7;
  font-family: gordita_medium;
  cursor: pointer;
  font-size: 14px;

  @media all and (max-width: 480px) {
    width: 90px;
    height: 30px;
    font-size: 12px;
    bottom: 13%;
    left: 7%;
    padding-top: 5px;
  }
`;
