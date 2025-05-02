import React, { useEffect, useRef } from "react";
import styled from "styled-components";

function Remarks({ isModal, setModal, remarkDetails }) {
  function useOutsideClick(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setModal(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef);

  let imageUrl = null;
  let imageExtension = "";
  let imageName = "";
  if (remarkDetails && remarkDetails.remark_image) {
    imageUrl = remarkDetails.remark_image;
    imageExtension = imageUrl.split(".").pop();
    imageName = imageUrl.split("/").pop();
  }

  function truncateText(text, limit) {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  }

  return (
    <Container style={{ transform: isModal && "scale(1,1)" }}>
      <Overlay></Overlay>
      <LeaderBoardSection ref={wrapperRef}>
        <ContentSection>
          <TopSection>
            <Heading>Remarks</Heading>
            <CancelDiv onClick={() => setModal(false)}>
              <CancelImg
                src={require("../../../../../assets/images/close-grey.svg")}
              />
            </CancelDiv>
          </TopSection>
          <Cover>
            <MiddleSection>
              <SubMiddleSection>
                {remarkDetails &&
                remarkDetails.remarks &&
                remarkDetails.remarks.length > 0 ? (
                  remarkDetails.remarks.map((remark) => (
                    <SubSection key={remark.id}>
                      <BollIcon
                        className={
                          remarkDetails.remarks.length > 1 &&
                          remark.description.length > 0
                            ? ""
                            : "active"
                        }
                      >
                        <div></div>
                      </BollIcon>
                      <Description
                        className={
                          remarkDetails.remarks.length > 1 ? "" : "active"
                        }
                      >
                        {remark.description ? remark.description : ""}
                      </Description>
                    </SubSection>
                  ))
                ) : (
                  <Description>No Remarks</Description>
                )}
              </SubMiddleSection>
            </MiddleSection>
            {imageUrl && imageUrl !== null ? (
              <BottomSection>
                <TopContiner>
                  {imageExtension.match(/(jpg|jpeg|png|svg|gif)$/i) ? (
                    <ImageContiner>
                      <img src={imageUrl} alt="remark" />
                    </ImageContiner>
                  ) : imageExtension.match(/(zip)$/i) ? (
                    <FileImageContiner>
                      <img
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/27-03-2023/zip.jpg"
                        alt=""
                      />
                    </FileImageContiner>
                  ) : (
                    <FileImageContiner>
                      <img
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/27-03-2023/folder_image.jpg"
                        alt=""
                      />
                    </FileImageContiner>
                  )}

                  <BottomContiner>
                    <LeftSection>
                      {imageExtension.match(/(jpg|jpeg|png|svg|gif)$/i) ? (
                        <ExtentionContiner>
                          <h6>{imageExtension}</h6>
                        </ExtentionContiner>
                      ) : imageExtension.match(/(zip)$/i) ? (
                        <ExtentionContiner className="green">
                          <h6>{imageExtension}</h6>
                        </ExtentionContiner>
                      ) : (
                        <ExtentionContiner className="red">
                          <h6>{imageExtension}</h6>
                        </ExtentionContiner>
                      )}
                      <p>{truncateText(imageName, 1)}</p>
                    </LeftSection>
                    <RightSection>
                      <FileDwonload
                        href={remarkDetails.remark_image}
                        download
                        target="_blank"
                      >
                        <img
                          src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/27-03-2023/Iconly.svg"
                          alt=""
                        />
                      </FileDwonload>
                    </RightSection>
                  </BottomContiner>
                </TopContiner>
              </BottomSection>
            ) : null}
          </Cover>
        </ContentSection>
      </LeaderBoardSection>
    </Container>
  );
}

export default Remarks;
const Container = styled.div`
  position: fixed;
  transition: 0.3s;
  transform: scale(0, 0);
  width: 100%;
  height: 100vh;
  z-index: 1000;
  left: 0;
  top: 0px;
  backdrop-filter: blur(4px);
`;
const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0px;
  width: 100%;
  height: 100vh;
`;

const LeaderBoardSection = styled.div`
  width: 800px;
  max-width: 900px;
  max-height: 80vh;
  overflow: hidden;
  margin: 0 auto;
  background: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  padding: 50px 40px;
  border-radius: 10px;
  transition: 0.5s;
  z-index: 101;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-bottom: 7px solid #2ca17f;
  ::after {
    content: "";
    width: 100%;
    height: 1px;
    border-top: 6px solid #27c590;
    position: absolute;
    bottom: -1px;
    left: 0;
  }
  @media (max-width: 980px) {
    width: 700px;
    padding: 50px 30px;
  }
  @media (max-width: 768px) {
    width: 560px;
    padding: 20px 20px;
  }
  @media (max-width: 640px) {
    width: 440px;
    padding: 20px 20px;
  }
  @media (max-width: 480px) {
    width: 350px;
    padding: 20px 16px;
  }
  @media (max-width: 360px) {
    width: 304px;
  }
`;
const ContentSection = styled.div``;
const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media all and (max-width: 480px) {
    padding-bottom: 14px;
  }
`;
const Heading = styled.h2`
  color: #4b4c4a;
  font-size: 20px;
  font-family: "gordita_medium" !important;
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;
const Cover = styled.div``;
const MiddleSection = styled.div`
  margin-top: 20px;
  @media (max-width: 640px) {
    margin-top: 20px;
  }
`;
const SubMiddleSection = styled.div`
  max-height: 251px;
  overflow-y: scroll;
  @media (max-width: 640px) {
    max-height: 158px;
    overflow-y: scroll;
  }
`;

const FileImageContiner = styled.div`
  width: 43%;
  margin: 0 auto;
  display: flex;
  height: 68%;
  align-items: center;
  justify-content: center;
  @media (max-width: 640px) {
    width: 39%;
  }
  img {
    width: 100%;
    display: block;
  }
`;

const Description = styled.p`
  line-height: 1.6rem;
  color: #3c3c3c;
  font-size: 16px;
  font-family: "gordita_regular" !important;
  margin-left: 15px;
  &.active {
    margin-left: 0px;
  }
  @media all and (max-width: 640px) {
    font-size: 12px;
  }
`;

const CancelDiv = styled.div`
  cursor: pointer;
  width: 20px;
  @media all and (max-width: 640px) {
    width: 16px;
  }
  @media all and (max-width: 480px) {
    width: 15px;
  }
`;
const CancelImg = styled.img`
  width: 100%;
  display: block;
`;
const BollIcon = styled.div`
  /* width: 15px; */
  display: inline-block;
  &.active {
    display: none;
  }
  div {
    background: #6b6b6b;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    margin-top: 7px;
  }
`;
const SubSection = styled.div`
  display: flex;
  margin-bottom: 11px;
`;
const BottomSection = styled.div`
  border-top: 2px solid #e7e7e7;
  padding: 2% 0 0 0;
`;
const TopContiner = styled.div`
  width: 32%;
  height: 170px;
  border: 1px solid #dad7d7;
  /* background-color: #000; */
  position: relative;
  border-radius: 8px;
  @media all and (max-width: 980px) {
    width: 38%;
  }
  @media all and (max-width: 760px) {
    width: 46%;
  }
  @media all and (max-width: 640px) {
    width: 60%;
  }
  @media all and (max-width: 480px) {
    width: 80%;
  }
  @media all and (max-width: 360px) {
    width: 90%;
  }
`;
const ImageContiner = styled.div`
  width: 51%;
  margin: 0 auto;
  height: 70%;
  padding: 1%;
  overflow: hidden;
  img {
    display: block;
    width: 100%;
    height: 110px;
  }
`;
const BottomContiner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  background: #e9e9e9;
  width: 100%;
  height: 50px;
  bottom: 0px;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  padding: 2% 4%;
`;
const LeftSection = styled.div`
  display: flex;
  align-items: center;
  width: 85%;
  p {
    color: #6b6b6b;
    font-size: 13px;
    font-family: "gordita_medium" !important;
    margin-left: 6px;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
  }
`;
const ExtentionContiner = styled.div`
  background: #50bee8;
  width: 34px;
  height: 29px;
  display: flex;
  align-items: center;
  justify-content: center;
  &.green {
    background: #118941;
  }
  &.red {
    background: #e5252a;
  }
  h6 {
    font-family: "gordita_medium" !important;
    color: #fff;
  }
`;
const RightSection = styled.div`
  width: 15%;
`;
const FileDwonload = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  cursor: pointer;
  img {
    width: 100%;
    display: block;
  }
`;
