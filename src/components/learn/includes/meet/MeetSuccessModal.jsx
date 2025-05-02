import React, { useEffect, useState } from "react";
import styled from "styled-components";
import closeImage from "../../../../assets/images/web/close.svg";
import successImage from "../../../../assets/images/meet/Verified-tick.svg";
import { useDispatch } from "react-redux";

function MeetSuccessModal({ setShowSuccessModal, setReload, setButtonLoader }) {
  return (
    <>
      <Overlay
        onClick={() => {
          // setProfilePicSubmited(false)
        }}
      ></Overlay>
      <BackContainer>
        <Modal>
          <TitleSection>
            <Left>
              <TickImage>
                <img src={successImage} alt="Tick" />
              </TickImage>
            </Left>
            <Title>Registration Successful!</Title>
            <Close
              onClick={() => {
                setShowSuccessModal(false);
                setButtonLoader(false);
                setReload(true);
              }}
            >
              <img src={closeImage} alt="Close" />
            </Close>
          </TitleSection>
          <Container>
            <InputDescription>
              The meeting will start promptly on time. Kindly ensure your timely
              presence. Thank you!
            </InputDescription>
          </Container>
          <ButtonDiv>
            <Button
              onClick={() => {
                setShowSuccessModal(false);
                setReload(true);
              }}
            >
              Okay
            </Button>
          </ButtonDiv>
        </Modal>
      </BackContainer>
    </>
  );
}

export default MeetSuccessModal;

const BackContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(88, 88, 88, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;

  &.active {
    transform: scale(1);
  }
`;
const Modal = styled.div`
  width: 700px;
  max-height: 90vh;
  overflow: hidden;
  margin: 0 auto;
  background-color: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  padding: 38px;
  border-radius: 12.24px;
  transition: all 0.4s ease;
  z-index: 101;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background-size: contain;
  background-repeat: no-repeat;
  max-width: 550px;

  @media (max-width: 560px) {
    max-width: 400px;
  }
  @media (max-width: 450px) {
    max-width: 350px;
    padding: 35px;
  }
  @media (max-width: 390px) {
    max-width: 300px;
  }
  @media (max-width: 480px) {
    max-width: 270px;
    padding: 25px;
  }
`;
const InputDescription = styled.p`
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  align-self: baseline;
  font-size: 16px;
  color: #5b5959;
  span {
    color: green;
  }
  p {
    color: #5b5959;
  }
  @media (max-width: 560px) {
    width: 100%;
  }
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
const Close = styled.span`
  width: 15px;
  display: block;
  cursor: pointer;
  position: absolute;
  right: 28px;
  top: 28px;
  img {
    display: block;
    width: 100%;
  }

  @media (max-width: 480px) {
    right: 18px;
    top: 15px;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-top: 25px;
  position: relative;
`;
const Button = styled.span`
  font-size: 16px;
  background: #0fa76f;
  cursor: pointer;
  font-family: "gordita_medium";
  border: 1px solid #15bf81;
  color: #fff;
  padding: 8px 12px;
  border-radius: 6px;
  width: fit-content;
  display: flex;

  @media (max-width: 340px) {
    font-size: 14px;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: right;
`;

const TitleSection = styled.div`
  width: 100%;
  padding-bottom: 25px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid #e7e6e6;

  @media (max-width: 480px) {
    padding-bottom: 16px;
  }
`;
const Title = styled.h2`
  font-family: "gordita_medium";
  font-size: 20px;
  color: #2d2d2d;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;
const Left = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const TickImage = styled.div`
  width: 40px;
  margin-right: 10px;

  img {
    width: 100%;
    display: block;
  }
`;
const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0px;
  width: 100%;
  height: 100vh;
`;
