import React from "react";
import VideoPlayer from "../../../applications/video-player/src/VideoPlayer";
import styled from "styled-components";

const videoJsOptions = {
  autoplay: true,
  controls: false,
  sources: [
    {
      src: "https://storage.googleapis.com/coverr-main/mp4%2Fcoverr-an-early-morning-1579770136327.mp4",
      type: "video/mp4",
    },
  ],
};
export default function VideoModal({
  toggleModal,
  handleToggleModal,
  image,
  play_url,
  title,
}) {
  return toggleModal ? (
    <div
      style={{
        backgroundColor: "rgba(0,0,0,0.9)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Container>
        <Button
          className="las la-times"
          title="close"
          onClick={handleToggleModal}
        ></Button>
        <div>
          <Title>{title}</Title>
          {play_url && (
            <VideoPlayer source={play_url} cover={image} {...videoJsOptions} />
          )}
        </div>
      </Container>
    </div>
  ) : null;
}

const Container = styled.div`
  width: 70%;
  position: relative;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 4px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 10px;
  border: none;
  border-radius: 0px;
  box-sizing: border-box;
  @media only screen and (max-width: 640px) {
    width: 90%;
    padding: 27px 16px;
  }
  @media only screen and (max-width: 360px) {
    width: 95%;
  }
`;
const Title = styled.h3`
  color: rgb(255, 255, 255);
  font-size: 22px;
  margin-bottom: 20px;
  font-family: "baloo_paaji_2semibold";
  @media only screen and (max-width: 640px) {
    margin-bottom: 20px;
    font-size: 16px;
  }
  @media only screen and (max-width: 360px) {
    margin-bottom: 5px;
  }
`;

const Button = styled.button`
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  color: rgb(0, 0, 0);
  background-color: white;
  box-sizing: border-box;
  border-radius: 50%;
  padding: 5px;
  z-index: 1;
  @media only screen and (max-width: 360px) {
    padding: 3px;
    right: 5px;
    top: 5px;
  }
`;
