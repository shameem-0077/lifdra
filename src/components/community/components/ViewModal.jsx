import React, { useState } from "react";
import styled from "styled-components";
import SpliderSlider from "./SpliderSlider";
import ViewDetails from "./ViewDetails";

function ViewModal({
  isModal,
  setModal,
  images,
  item,
  isCmtDel,
  setCmDel,
  setSelectedId,
  isReport,
  setReport,
  setOptions,
  isOptions,
}) {
  return (
    <>
      <Backdrop isVisible={isModal} />
      <Container isVisible={isModal}>
        <CloseButton onClick={() => setModal(false)}>
          <img
            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/27-09-2024/cross-icon.svg"
            alt="close"
          />
        </CloseButton>
        <InnerContainer>
          <ContentSection>
            <ViewerSection>
              <ImgContainer>
                <SpliderSlider item={item} />
              </ImgContainer>
            </ViewerSection>
            <DetailsSection>
              <ViewDetails
                setSelectedId={setSelectedId}
                item={item}
                isModal={isModal}
                setModal={setModal}
                setOptions={setOptions}
                isOptions={isOptions}
                setReport={setReport}
                isReport={isReport}
                setCmDel={setCmDel}
                isCmtDel={isCmtDel}
              />
            </DetailsSection>
          </ContentSection>
        </InnerContainer>
      </Container>
    </>
  );
}

export default ViewModal;

const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  backdrop-filter: blur(4px);
  z-index: 999;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  transition: opacity 0.3s, visibility 0.3s;
  background: rgba(13, 18, 28, 0.6);
`;

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100dvh;
  z-index: 1000;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  transition: opacity 0.3s, visibility 0.3s;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const InnerContainer = styled.div`
  width: 90%;
  max-width: 1140px;
  height: 90vh;
  max-height: 800px;
  margin: 0 auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  transition: 0.5s;
  z-index: 101;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 95%;
    height: 95svh;
  }
  @media all and (max-width: 480px) {
    width: 99%;
    height: 100dvh;
    top: 48%;
  }
`;

const ContentSection = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
  border-radius: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ViewerSection = styled.div`
  width: 60%;
  background: #cdd5df;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    height: 50%;
  }
`;

const DetailsSection = styled.div`
  width: 40%;
  overflow-y: auto;
  background: #ffffff;

  @media (max-width: 768px) {
    width: 100%;
    height: 50%;
  }
`;

const ImgContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    /* object-fit: contain; */
  }
`;

const CloseButton = styled.div`
  display: none;
  height: 20px;
  width: 20px;
  cursor: pointer;
  position: absolute;
  z-index: 20000;
  right: 20px;
  top: 15px;
  img {
    display: block;
    width: 60%;
  }
  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
    background: #ffff;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
